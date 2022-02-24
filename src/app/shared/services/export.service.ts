import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core'
import { EventLabelPipe, EventRelTimePipe } from '../../ui/pipes/event.pipe'
import { EventType, Log, Record } from '../models'
import * as JSZip from 'jszip'

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor(
        private eventLabel: EventLabelPipe,
        private date: DatePipe,
        private eventRelTime: EventRelTimePipe
    ) { }

    exportCSV (records: Record[], log: Log) {
        const blob = this.recordsToCSV(records, log);
        blob && this.downloadFile(blob, `${this.recordsFilename(log)}.csv`)
    }

    private recordsFilename(log: Log) {
        const acceptableTitleLength = 40;
        const acceptableMaxLength = 60;
        const filename = !!log.desc?.length ?
            `${log.title.length > acceptableTitleLength ? log.title.substring(0, acceptableTitleLength - 1) : log.title} - ${log.desc}` :
            log.title.length > acceptableMaxLength ? log.title.substring(0, acceptableMaxLength - 1) : log.title;
        return filename.length > acceptableMaxLength ? `${filename.substring(0, acceptableMaxLength - 9)} ${log.id.substring(0, 6)}` : filename;
    }

    private recordsToCSV(records: Record[], log: Log) {
        if (!!records?.length && !!log) {
            const delimiter = ';';
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
            const csvData = csv.map(row => row.map(value => `"${value}"`).join(delimiter)).join('\r\n');
            return new Blob(['\ufeff', csvData], { type: 'text/csv' });
        }
        return null;
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


}