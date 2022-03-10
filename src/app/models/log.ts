import { BaseLog } from './baselog';

export const LOGS = 'logs';

export class Log extends BaseLog {
    prev: string = null;
    templateId: string;
    recordsCount = 0;

    constructor(templateId: string, title: string, desc: string) {
        super();
        this.templateId = templateId;
        this.title = title;
        this.desc = desc;
    }
}

export interface SharedLogs {
    version: string,
    logs: Partial<Log>[]
}