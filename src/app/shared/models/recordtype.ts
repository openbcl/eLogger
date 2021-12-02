import { v4 as uuid } from 'uuid';
import { EventTemplate } from './event';
import { version } from '../../../environments/build';

export class Recordtype {
    id: string;
    title: string;
    desc: string;
    version: string;
    revision: Date;
    eventTemplates: EventTemplate[];

    constructor() {
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
