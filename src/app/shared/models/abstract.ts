import { v4 as uuid } from 'uuid';

export abstract class AbstractLog {
    readonly id = uuid();
    readonly key?: number;
    title: string;
    desc: string;
}