import { SelectItem } from "primeng/api";

export enum EventType {
    DEFAULT, START, PAUSE, RESUME, END, TEXT, PICTURE, AUDIO
}

export interface EventTemplate {
    name: string,
    eventType: EventType,
    icon: SelectItem
}

export class EventLog implements EventTemplate {
    name: string;
    eventType: EventType;
    icon: SelectItem;
    text?: string;
    date: Date;

    constructor(template: EventTemplate) {
        this.name = template.name;
        this.eventType = template.eventType;
        this.icon = template.icon;
        this.date = new Date();
    }
}