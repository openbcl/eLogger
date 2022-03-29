import { SelectItem } from "primeng/api";

export enum EventType {
    DEFAULT, START, PAUSE, RESUME, END, TEXT, PHOTO, AUDIO
}

export interface EventTemplate {
    name: string,
    eventType: EventType,
    icon: SelectItem,
    color: string
}