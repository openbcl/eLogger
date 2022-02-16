import { SelectItem, PrimeIcons } from "primeng/api";
import { EventTemplate, EventType, Log } from "../models";

export const reorderLogs = (values: Log[]) => !!values.length ? values.map<Log>((value, index, array) => ({
    ...value,
    prev: index === 0 ? null : array[index - 1].id
})) : values;

export const orderedLogs = (values: Log[]) => {
    if (!values?.length) return values;
    try {
        const orderedValeus = [ values.find(log => log.prev === null) ];
        while (orderedValeus.length < values.length) {
            orderedValeus.push(values.find(value => value.prev === orderedValeus[orderedValeus.length - 1].id)!)
        }
        return orderedValeus;
    } catch (err) {
        console.error(err);
        return reorderLogs(values);
    }
}

export const compareEventTemplates = (a: EventTemplate, b: EventTemplate) => (
    a.name === b.name &&
    a.eventType === b.eventType
)

export const deepCompareEventTemplates = (a: EventTemplate, b: EventTemplate) => (
    compareEventTemplates(a, b) &&
    a.icon.value === b.icon.value &&
    a.color === b.color
)

export const eventTypes = Object.getOwnPropertyNames(EventType).filter(value => !value.match(/\d+/)).map<EventType>(value => (<any>EventType)[value]);

export const eventIcons: SelectItem[] = [
    { value: PrimeIcons.CODE, styleClass: 'el-invisible' },
    { value: PrimeIcons.ARROW_LEFT },
    { value: PrimeIcons.ARROW_RIGHT },
    { value: PrimeIcons.ARROW_DOWN },
    { value: PrimeIcons.ARROW_UP },
    { value: PrimeIcons.ARROW_UP_LEFT },
    { value: PrimeIcons.ARROW_UP_RIGHT },
    { value: PrimeIcons.ARROW_DOWN_LEFT },
    { value: PrimeIcons.ARROW_DOWN_RIGHT },
    { value: 'pi pi-arrows-h' },
    { value: 'pi pi-arrows-v' },
    { value: PrimeIcons.BAN },
    { value: PrimeIcons.BELL },
    { value: PrimeIcons.BOLT },
    { value: PrimeIcons.HOME },
    { value: PrimeIcons.BUILDING },
    { value: PrimeIcons.CAR },
    { value: 'fas fa-bicycle', styleClass: 'el-icon-w16' },
    { value: 'fas fa-running', styleClass: 'el-icon-w16' },
    { value: 'fas fa-male', styleClass: 'el-icon-w16' },
    { value: 'fas fa-female', styleClass: 'el-icon-w16' },
    { value: 'fas fa-child', styleClass: 'el-icon-w16' },
    { value: 'fas fa-mars', styleClass: 'el-icon-w16' },
    { value: 'fas fa-venus', styleClass: 'el-icon-w16' },
    { value: 'fas fa-transgender', styleClass: 'el-icon-w16' },
    { value: PrimeIcons.VIDEO },
    { value: PrimeIcons.IMAGE },
    { value: PrimeIcons.CLOCK },
    { value: PrimeIcons.HISTORY },
    { value: PrimeIcons.SUN },
    { value: PrimeIcons.CLOUD },
    { value: PrimeIcons.CLOUD_DOWNLOAD },
    { value: PrimeIcons.CLOUD_UPLOAD },
    { value: PrimeIcons.DOWNLOAD },
    { value: PrimeIcons.UPLOAD },
    { value: PrimeIcons.SIGN_IN },
    { value: PrimeIcons.SIGN_OUT },
    { value: PrimeIcons.INFO_CIRCLE },
    { value: PrimeIcons.EXCLAMATION_TRIANGLE },
    { value: PrimeIcons.QUESTION },
    { value: PrimeIcons.EYE },
    { value: PrimeIcons.EYE_SLASH },
    { value: PrimeIcons.HEART },
    { value: PrimeIcons.STAR },
    { value: 'far fa-thumbs-up', styleClass: 'el-icon-w16' },
    { value: 'far fa-thumbs-down', styleClass: 'el-icon-w16' },
    { value: PrimeIcons.TIMES },
    { value: PrimeIcons.LOCK_OPEN },
    { value: PrimeIcons.LOCK },
    { value: PrimeIcons.PLUS },
    { value: PrimeIcons.MINUS },
    { value: PrimeIcons.POWER_OFF },
    { value: PrimeIcons.REFRESH },
    { value: PrimeIcons.REPLAY },
    { value: PrimeIcons.USER },
    { value: PrimeIcons.USER_PLUS },
    { value: PrimeIcons.USER_MINUS },
    { value: PrimeIcons.VOLUME_OFF },
    { value: PrimeIcons.VOLUME_DOWN },
    { value: PrimeIcons.VOLUME_UP }
]