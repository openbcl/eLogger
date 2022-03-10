import { BaseLog } from './baselog'
import { EventTemplate } from './event';

export const TEMPLATES = 'templates';

export class Template extends BaseLog {
    revision = new Date();
    eventTemplates: EventTemplate[] = [];

    constructor(title: string, desc: string) {
        super();
        this.title = title;
        this.desc = desc;
    }
}

export interface SharedTemplates {
    version: string,
    templates: Partial<Template>[]
}