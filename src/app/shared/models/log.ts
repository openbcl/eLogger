import { v4 as uuid } from 'uuid';
import { EventLog } from '.';

export const LOGS = 'logs';

export class Log {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    prev: string = null!;
    next: string = null!;
    logTypeId: string;
    eventLogs: EventLog[] = [];

    constructor(logTypeId: string) {
        this.logTypeId = logTypeId;
    }
}
