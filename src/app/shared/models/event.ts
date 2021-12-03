export enum EventType {
    DEFAULT, START, END, TEXT, PICTURE, AUDIO
}

export interface EventTemplate {
    name: string,
    log: EventType,
    icon: string
}

export class EventLog implements EventTemplate {
    name: string;
    log: EventType;
    icon: string;
    text?: string;
    date: Date;

    constructor(template: EventTemplate) {
        this.name = template.name;
        this.log = template.log;
        this.icon = template.icon;
        this.date = new Date();
    }
}