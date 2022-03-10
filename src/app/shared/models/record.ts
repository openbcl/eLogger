import { SelectItem } from "primeng/api";
import { EventTemplate, EventType } from "./event";

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

    constructor(eventTemplate: EventTemplate, logId: string, date: Date) {
        this.logId = logId;
        this.name = eventTemplate.name;
        this.eventType = eventTemplate.eventType;
        this.icon = eventTemplate.icon;
        this.color = eventTemplate.color;
        this.date = date;
    }
}