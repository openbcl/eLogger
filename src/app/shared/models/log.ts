import { v4 as uuid } from 'uuid';
import { Record } from '.';

export const LOGS = 'logs';

export class Log {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    logTemplateId: string;
    records: Record[] = [];

    constructor(logTemplateId: string) {
        this.logTemplateId = logTemplateId;
    }
}
