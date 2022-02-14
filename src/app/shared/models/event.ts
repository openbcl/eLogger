import { SelectItem } from "primeng/api";

export enum EventType {
    DEFAULT, START, PAUSE, RESUME, END, TEXT, PICTURE, AUDIO
}

export interface EventTemplate {
    name: string,
    eventType: EventType,
    icon: SelectItem,
    color: string
}

export class Record implements EventTemplate {
    name: string;
    eventType: EventType;
    icon: SelectItem;
    color: string;
    text?: string;
    date: Date;

    constructor(template: EventTemplate) {
        this.name = template.name;
        this.eventType = template.eventType;
        this.icon = template.icon;
        this.color = template.color;
        this.date = new Date();
    }
}