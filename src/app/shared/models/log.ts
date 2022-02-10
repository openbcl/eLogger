import { v4 as uuid } from 'uuid';
import { EventLog } from '.';

export const LOGS = 'logs';

export class Log {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    logTemplateId: string;
    eventLogs: EventLog[] = [];

    constructor(logTemplateId: string) {
        this.logTemplateId = logTemplateId;
    }
}
