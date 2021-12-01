import { v4 as uuid } from 'uuid';
import { EventTemplate } from './event';

export class Recordtype {
    id: string;
    title: string;
    desc: string;
    version!: string;
    revision: Date;
    eventTemplates: EventTemplate[];

    constructor(version: string) {
        this.id = uuid();
        this.title = '';
        this.desc = '';
        this.version = version;
        this.revision = new Date();
        this.eventTemplates = [];
    }

    update() {
        this.revision = new Date();
    }
}
