import { AbstractLog } from './abstract'
import { EventTemplate } from './event';

export const LOGTEMPLATES = 'logtemplates';

export class LogTemplate extends AbstractLog {
    revision = new Date();
    eventTemplates: EventTemplate[] = [];

    constructor(title: string, desc: string) {
        super();
        this.title = title;
        this.desc = desc;
    }
}

export interface SharedLogTemplates {
    version: string,
    logTemplates: Partial<LogTemplate>[]
}