export enum EventType {
    DEFAULT, START, END, TEXT, PICTURE, AUDIO
}

export interface EventTemplate {
    name: string,
    record: EventType,
    icon: string
}

export class EventLog implements EventTemplate {
    name: string;
    record: EventType;
    icon: string;
    text?: string;
    date: Date;

    constructor(template: EventTemplate) {
        this.name = template.name;
        this.record = template.record;
        this.icon = template.icon;
        this.date = new Date();
    }
}