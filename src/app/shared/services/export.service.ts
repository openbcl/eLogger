import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { EventLabelPipe, EventRelTimePipe } from '../../ui/pipes/event.pipe'
import { LogTemplateDescPipe, LogTemplateTitlePipe } from '../../ui/pipes/log.pipe'
import { EventType, Log, LogTemplate, Record } from '../models'
import { allRecordsSelector } from '../../store/record.selectors';
import { loadAllRecords } from '../../store/record.actions';
import { sha1 } from 'object-hash'
import { toJSON } from '../utils/helper';
import * as JSZip from 'jszip'


@Injectable({
    providedIn: 'root'
})
export class ExportService {

    private delimiter = ';';
    private acceptableTitleLength = 40;
    private acceptableMaxLength = 60;

    constructor(
        private eventLabel: EventLabelPipe,
        private date: DatePipe,
        private eventRelTime: EventRelTimePipe,
        private logTemplateTitle: LogTemplateTitlePipe,
        private logTemplateDesc: LogTemplateDescPipe,
        private store: Store
    ) { }

    shareLogs (logs: Log[], logTemplates: LogTemplate[]) {
        const blob = this.logsToCSV(logs, logTemplates);
        if (blob) {
            const filename = this.uniqueFilename('eLogger_export', blob, '')
            const logsSummaryFile = {
                blob,
                filename: `${filename}csv`
            }
            if (!!logs.find(log => !!log.recordsCount)) {
                this.store.dispatch(loadAllRecords());
                this.store.pipe(
                    select(allRecordsSelector),
                    filter(allRecords => !!allRecords && logs.filter(log => !!log.recordsCount).map(log => log.id).every(id => !!Object.keys(allRecords).find(key => key === id))),
                    take(1)
                ).subscribe(async allRecords => {
                    const files: {blob: Blob, filename: string}[] = logs.filter(log => !!log.recordsCount).map(log => ({
                        blob: this.recordsToCSV(allRecords[log.id], log),
                        filename: this.recordsFilename(log, allRecords[log.id])
                    }));
                    files.push(logsSummaryFile);
                    await this.downloadZipFile(files, `${filename}zip`)
                });
            } else {
                this.downloadFile(logsSummaryFile.blob, logsSummaryFile.filename)
            }
        }
    }

    shareRecords (records: Record[], log: Log) {
        const blob = this.recordsToCSV(records, log);
        blob && this.downloadFile(blob, this.recordsFilename(log, records))
    }

    exportLogTemplates(logTemplates: LogTemplate[]) {
        this.downloadJSON(logTemplates, 'logTemplates', 'logtemplates');
    }

    exportLogs(logs: Log[]) {
        this.downloadJSON(logs, 'logs', 'logs');
    }

    uniqueFilename (part: string, data: any, extension: string) {
        return `${part}_${this.date.transform(new Date(), 'yyyy-MM-dd')}_${sha1(JSON.stringify(data)).substring(0,7)}.${extension}`;
    }

    private recordsFilename(log: Log, records: Record[]) {
        const part = !!log.desc?.length ?
            `${log.title.length > this.acceptableTitleLength ? log.title.substring(0, this.acceptableTitleLength) : log.title} - ${log.desc}` :
            log.title.length > this.acceptableMaxLength ? log.title.substring(0, this.acceptableMaxLength) : log.title;
        return this.uniqueFilename(
            `${(part.length > this.acceptableMaxLength ? `${part.substring(0, this.acceptableMaxLength)}` : part)}_${log.id.substring(0, 6)}`.replace(/ /g, '_'),
            records,
            'csv'
        );
    }

    private recordsToCSV(records: Record[], log: Log) {
        if (!!records?.length && !!log) {
            const csv: string[][] = [];
            const containStart = !!records.find(r => r.eventType === EventType.START);
            const containData = !!records.find(r =>  [EventType.TEXT, EventType.AUDIO, EventType.PICTURE].includes(r.eventType));
            const headers = [ 'Name', 'Type' ];
            if (containData) {
                headers.push('Data');
            }
            headers.push('Absolute Time');
            if (containStart) {
                headers.push('Relative Time');
            }
            csv.push(headers);
            records.forEach(record => {
                const relTime = this.eventRelTime.transform(record, records);
                const row = [ record.name, this.eventLabel.transform(record.eventType) ];
                if (containData) {
                    row.push(!!record.text?.length ? record.text : '');
                }
                row.push(this.date.transform(record.date, 'yyyy-MM-dd, HH:mm:ss'));
                if (containStart) {
                    row.push(!!relTime.time ? `${relTime.prefix}${this.date.transform(relTime.time, 'HH:mm:ss.SSS', 'UTC+0')}`: relTime.prefix)
                }
                csv.push(row);
            });
            const csvData = csv.map(row => row.map(value => `"${value}"`).join(this.delimiter)).join('\r\n');
            return this.csvBlob(csvData);
        }
        return null;
    }

    private logsToCSV(logs: Log[], logTemplates: LogTemplate[]) {
        if (!!logs?.length && !!logTemplates?.length) {
            const csv: (string|number)[][] = [[ 'Title', 'Description', 'ID', 'Type', 'Records' ]];
            logs.forEach(log => {
                const logTemplateTitle = this.logTemplateTitle.transform(log.logTemplateId, logTemplates);
                const logTemplateDesc = this.logTemplateDesc.transform(log.logTemplateId, logTemplates);
                csv.push([
                    log.title,
                    log.desc,
                    log.id.substring(0, 6),
                    !!logTemplateDesc?.length ? `${logTemplateTitle} (${logTemplateDesc})` : logTemplateTitle,
                    log.recordsCount
                ])
            });
            const csvData = csv.map(row => row.map(value => typeof(value) === 'string' ? `"${value}"` : value).join(this.delimiter)).join('\r\n');
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

    private async downloadZipFile(files: {blob: Blob, filename: string}[], filename: string) {
        const zip = new JSZip();
        files.forEach(file => zip.file(file.filename, file.blob))
        await zip.generateAsync({type: 'blob'}).then(zipFile => {
            this.downloadFile(zipFile, filename)
        });
    }

    private downloadJSON(values: any[], key: string, part: string) {
        const data = toJSON(values, key, true, true);
        const blob = new Blob([data], { type: 'text/json' });
        const filename =  this.uniqueFilename(part, values, 'json');
        this.downloadFile(blob, filename);
    }

}