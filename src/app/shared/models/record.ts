import { v4 as uuid } from 'uuid';
import { EventLog } from './event';

export class Record {
    id: string;
    title: string;
    desc: string;
    prev?: string;
    next?: string;
    recordTypeId: string;
    eventLogs: EventLog[];

    constructor(recordTypeId: string) {
        this.id = uuid();
        this.title = '';
        this.desc = '';
        this.recordTypeId = recordTypeId;
        this.eventLogs = [];
    }
}
