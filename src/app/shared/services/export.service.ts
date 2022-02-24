import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core'
import { EventLabelPipe, EventRelTimePipe } from '../../ui/pipes/event.pipe'
import { EventType, Log, Record } from '../models'

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
        if (!!records?.length && !!log) {
            const delimiter = ';';
            const csv: string[][] = [];
            const containStart = !!records.find(r => r.eventType === EventType.START);
            const containData = !!records.find(r =>  [EventType.TEXT, EventType.AUDIO, EventType.PICTURE].includes(r.eventType));
            let headers = [ 'name', 'type', 'absolute time' ];
            if (containStart) {
                headers.push('relative time');
            }
            if (containData) {
                headers.push('data');
            }
            csv.push(headers);
            records.forEach(record => {
                const relTime = this.eventRelTime.transform(record, records);
                const row = [
                    record.name,
                    this.eventLabel.transform(record.eventType),
                    this.date.transform(record.date, 'yyyy-MM-dd, HH:mm:ss')
                ];
                if (containStart) {
                    row.push(!!relTime.time ? `${relTime.prefix}${this.date.transform(relTime.time, 'HH:mm:ss.SSS', 'UTC+0')}`: relTime.prefix)
                }
                if (containData) {
                    row.push(!!record.text?.length ? record.text : '');
                }
                csv.push(row);
            });
            const csvData = csv.map(row => row.map(value => `"${value}"`).join(delimiter)).join('\r\n');
            this.provideFileDownload(csvData, 'text/csv', `${log.title.replace(/ /g, '_')}-${log.id.split('-')[0]}.csv`)
        }
    }

    private provideFileDownload(data: string, type: string, filename: string = 'test.csv') {
        const blob = new Blob([data], { type });
        const element = window.document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = filename;        
        element.click();        
        window.URL.revokeObjectURL(element.href);
        element.remove();
    }

}