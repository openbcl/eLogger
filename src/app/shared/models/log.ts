import { v4 as uuid } from 'uuid';
import { AbstractLog } from '.';

export const LOGS = 'logs';

export class Log implements AbstractLog {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    prev: string = null;
    logTemplateId: string;
    recordsCount = 0;

    constructor(logTemplateId: string) {
        this.logTemplateId = logTemplateId;
    }
}

export interface SharedLogs {
    version: string,
    logs: Log[]
}