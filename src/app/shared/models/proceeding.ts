import { v4 as uuid } from 'uuid';
import { EventLog } from '.';

export const PROCEEDINGS = 'proceedings';

export class Proceeding {
    readonly id = uuid();
    readonly key?: number;
    title = '';
    desc = '';
    prev: string = null!;
    next: string = null!;
    recordTypeId: string;
    eventLogs: EventLog[] = [];

    constructor(recordTypeId: string) {
        this.recordTypeId = recordTypeId;
    }
}
