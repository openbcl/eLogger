import { SelectItem } from "primeng/api";
import { EventTemplate, EventType } from ".";

export const RECORDS = 'records';

export class Record implements EventTemplate {
    readonly key?: number;
    readonly logId: string;
    name: string;
    eventType: EventType;
    icon: SelectItem;
    color: string;
    text?: string;
    date: Date;

    constructor(template: EventTemplate, logId: string, date: Date) {
        this.logId = logId;
        this.name = template.name;
        this.eventType = template.eventType;
        this.icon = template.icon;
        this.color = template.color;
        this.date = date;
    }
}