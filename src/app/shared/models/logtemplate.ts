import { v4 as uuid } from 'uuid';
import { EventTemplate } from '.';

export const LOGTEMPLATES = 'logtemplates';

export class LogTemplate {
    readonly id = uuid();
    readonly key?: number;
    title: string;
    desc: string;
    revision = new Date();
    eventTemplates: EventTemplate[] = [];

    constructor(title: string, desc = '') {
        this.title = title;
        this.desc = desc;
    }
}
