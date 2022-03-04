import { AbstractLog } from './abstract';

export const LOGS = 'logs';

export class Log extends AbstractLog {
    prev: string = null;
    logTemplateId: string;
    recordsCount = 0;

    constructor(logTemplateId: string, title: string, desc: string) {
        super();
        this.logTemplateId = logTemplateId;
        this.title = title;
        this.desc = desc;
    }
}

export interface SharedLogs {
    version: string,
    logs: Partial<Log>[]
}