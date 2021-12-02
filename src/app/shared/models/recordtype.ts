import { v4 as uuid } from 'uuid';
import { EventTemplate } from '.';

export const RECORDTYPES = 'recordtypes';

export class RecordType {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    revision = new Date();
    eventTemplates: EventTemplate[] = [];
}
