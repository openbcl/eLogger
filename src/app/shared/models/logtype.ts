import { v4 as uuid } from 'uuid';
import { EventTemplate } from '.';

export const LOGTYPES = 'logtypes';

export class LogType {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    revision = new Date();
    eventTemplates: EventTemplate[] = [];
}
