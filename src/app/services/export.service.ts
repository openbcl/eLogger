import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store';
import { filter, from, map, of, switchMap, take, combineLatest } from 'rxjs';
import { EventLabelPipe, EventRelTimePipe, EventTimeDiffPipe } from '../ui/pipes/event.pipe'
import { TemplateDescPipe, TemplateTitlePipe } from '../ui/pipes/log.pipe'
import { EventType, Log, Template, Record } from '../models'
import { allRecordsSelector } from '../store/record.selectors';
import { loadAllRecords } from '../store/record.actions';
import { sha1 } from 'object-hash'
import { toJSON } from '../utils/lib';
import { RecordService } from './record.service';
import * as JSZip from 'jszip'


@Injectable({
    providedIn: 'root'
})
export class ExportService {

    private acceptableTitleLength = 40;
    private acceptableMaxLength = 60;

    constructor(
        private eventLabel: EventLabelPipe,
        private date: DatePipe,
        private eventRelTime: EventRelTimePipe,
        private eventTimeDiff: EventTimeDiffPipe,
        private templateTitle: TemplateTitlePipe,
        private templateDesc: TemplateDescPipe,
        private store: Store,
        private recordService: RecordService
    ) { }

    shareLogs (logs: Log[], templates: Template[], seperator: string) {
        const blob = this.logsToCSV(logs, templates, seperator);
        const filename = this.uniqueFilename('eLogger_export', blob, '')
        const logsSummaryFile = {
            blob,
            filename: `${filename}csv`
        }
        if (!!logs.find(log => !!log.recordsCount)) {
            this.store.dispatch(loadAllRecords());
            return this.store.pipe(
                select(allRecordsSelector),
                filter(allRecords => !!allRecords && logs.filter(log => !!log.recordsCount).map(log => log.id).every(id => !!Object.keys(allRecords).find(key => key === id))),
                take(1),
                switchMap(allRecords => {
                    const files: {blob: Blob, filename: string}[] = logs.filter(log => !!log.recordsCount).map(log => ({
                        blob: this.recordsToCSV(allRecords[log.id], log, seperator),
                        filename: `${this.folderName(log)}/${this.recordsFilename(allRecords[log.id], log)}`
                    }));
                    files.push(logsSummaryFile);
                    const mediaFiles = logs.filter(log => !!allRecords[log.id]?.find(record => [EventType.AUDIO, EventType.PHOTO].includes(record.eventType))).map(log => ({
                        records: allRecords[log.id],
                        log,
                        folder: this.folderName(log)
                    }))
                    return this.downloadZipFile(files, `${filename}zip`, mediaFiles)
                })
            );
        } else {
            return of(this.downloadFile(logsSummaryFile.blob, logsSummaryFile.filename))
        }
    }

    shareRecords (records: Record[], log: Log, seperator: string) {
        const blob = this.recordsToCSV(records, log, seperator);
        const filename = this.recordsFilename(records, log);
        if (!records.find(record => [EventType.PHOTO, EventType.AUDIO].includes(record.eventType))) {
            return of(this.downloadFile(blob, filename));
        }
        return from(this.downloadZipFile([ { filename, blob } ], this.uniqueFilename(this.folderName(log), records, 'zip'), [{ records, log, folder: '.' }]))
    }

    exportTemplates(templates: Template[]) {
        this.downloadJSON(templates, 'templates', 'templates');
    }

    exportLogs(logs: Log[]) {
        this.downloadJSON(logs, 'logs', 'logs');
    }

    private fsCompatibleFilename(path: string) {
        return path.replace(/[/\\?%*:|"<>,]/g, '_');
    }

    uniqueFilename (part: string, data: any, extension: string) {
        return this.fsCompatibleFilename(`${part}_${this.date.transform(new Date(), 'yy-MM-dd')}_${sha1(JSON.stringify(data)).substring(0,7)}.${extension}`);
    }

    private folderName(log: Log) {
        const part = !!log.desc?.length ?
            `${log.title.length > this.acceptableTitleLength ? log.title.substring(0, this.acceptableTitleLength) : log.title} - ${log.desc}` :
            log.title.length > this.acceptableMaxLength ? log.title.substring(0, this.acceptableMaxLength) : log.title;
        return this.fsCompatibleFilename(`${(part.length > this.acceptableMaxLength ? `${part.substring(0, this.acceptableMaxLength)}` : part)}_${log.id.substring(0, 6)}`.replace(/ /g, '_'));
    }

    private recordsFilename(records: Record[], log: Log) {
        return this.uniqueFilename(this.folderName(log), records, 'csv');
    }

    private mediaFilename(record: Record, log: Log) {
        return this.fsCompatibleFilename(`${this.folderName(log)}_${this.date.transform(record.date, 'yy-MM-dd_HH-mm-ss-SSS')}.${record.data === 'jpeg' ? 'jpg' : record.data}`)
    }

    private dataUrlToBlob(data: string) {
        const type = data.match(/data:(.+?);base64/)[1];
        const marker = ';base64,';
        const base64 = data.substring(data.indexOf(marker) + marker.length);
        const raw = window.atob(base64);
        const rawLength = raw.length;
        const arr = new Uint8Array(new ArrayBuffer(rawLength));
        for (let i = 0; i < rawLength; i++) {
            arr[i] = raw.charCodeAt(i);
        }
        return new Blob([arr], { type });
    }

    private recordsToCSV(records: Record[], log: Log, seperator: string) {
        if (!!records?.length && !!log) {
            const csv: string[][] = [];
            const containStart = !!records.find(r => r.eventType === EventType.START);
            const containData = !!records.find(r =>  [EventType.TEXT, EventType.AUDIO, EventType.PHOTO].includes(r.eventType));
            const headers = [ 'Name', 'Type' ];
            if (containData) {
                headers.push('Data');
            }
            headers.push('Absolute Time');
            headers.push('Time Difference');
            if (containStart) {
                headers.push('Relative Time');
            }
            csv.push(headers);
            records.forEach(record => {
                const relTime = this.eventRelTime.transform(record, records);
                const timeDiff = this.eventTimeDiff.transform(record, records);
                const row = [ record.name, this.eventLabel.transform(record.eventType, false) ];
                if (containData) {
                    switch(record.eventType) {
                        case EventType.PHOTO:
                            row.push(!!record.data?.length ? this.mediaFilename(record, log) : '');
                            break;
                        case EventType.AUDIO:
                            row.push(!!record.data?.length ? this.mediaFilename(record, log) : '');
                            break;
                        default:
                            row.push(!!record.data?.length ? record.data : '');
                    }
                }
                row.push(this.date.transform(record.date, 'yy-MM-dd, HH:mm:ss'));
                row.push(`${timeDiff.days ? `${timeDiff.days}d ` : ''}${this.date.transform(timeDiff.time, 'HH:mm:ss.SSS', 'UTC+0')}`);
                if (containStart) {
                    row.push(!!relTime.time ? `${relTime.prefix}${relTime.days ? `${relTime.days}d ` : ''}${this.date.transform(relTime.time, 'HH:mm:ss.SSS', 'UTC+0')}`: relTime.prefix);
                }
                csv.push(row);
            });
            const csvData = csv.map(row => row.map(value => `"${value}"`).join(seperator)).join('\r\n');
            return this.csvBlob(csvData);
        }
        return null;
    }

    private logsToCSV(logs: Log[], templates: Template[], seperator: string) {
        if (!!logs?.length && !!templates?.length) {
            const csv: (string|number)[][] = [[ 'Title', 'Description', 'ID', 'Type', 'Records' ]];
            logs.forEach(log => {
                const templateTitle = this.templateTitle.transform(log.templateId, templates);
                const templateDesc = this.templateDesc.transform(log.templateId, templates);
                csv.push([
                    log.title,
                    log.desc,
                    log.id.substring(0, 6),
                    !!templateDesc?.length ? `${templateTitle} (${templateDesc})` : templateTitle,
                    log.recordsCount
                ])
            });
            const csvData = csv.map(row => row.map(value => typeof(value) === 'string' ? `"${value}"` : value).join(seperator)).join('\r\n');
            return this.csvBlob(csvData);
        }
        return null;
    }

    private csvBlob(data: string) {
        return new Blob(['\ufeff', data], { type: 'text/csv' });
    }

    private downloadFile(blob: Blob, filename: string) {
        const element = window.document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = filename;
        element.click();
        window.URL.revokeObjectURL(element.href);
        element.remove();
    }

    private async downloadZipFile(files: {blob: Blob, filename: string}[], filename: string, logsData: { records: Record[], log: Log, folder: string }[] = []) {
        const zip = new JSZip();
        const generateZIP = async () => await zip.generateAsync({type: 'blob'}).then(zipFile => {
            this.downloadFile(zipFile, filename)
        });
        files.forEach(file => zip.file(file.filename, file.blob))
        if (!!logsData?.find(logData => logData.records?.find(record => [EventType.AUDIO, EventType.PHOTO].includes(record.eventType)))) {
            return new Promise<void>(resolve => combineLatest(logsData.map(logData => logData.records
                .filter(record => [EventType.AUDIO, EventType.PHOTO].includes(record.eventType))
                .map(record => this.recordService.loadRecordData(record.key).pipe(map(data => {
                    zip.file(`${logData.folder}/${this.mediaFilename(record, logData.log)}`, this.dataUrlToBlob(data))
                })))
            ).flat()).pipe(take(1)).subscribe(async () => {
                await generateZIP();
                resolve();
            }));
        } else {
            await generateZIP();
        }
    }

    private downloadJSON(values: any[], key: string, part: string) {
        const data = toJSON(values, key, true, true);
        const blob = new Blob([data], { type: 'text/json' });
        const filename =  this.uniqueFilename(part, values, 'json');
        this.downloadFile(blob, filename);
    }

}