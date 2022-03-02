import { SelectItem, PrimeIcons } from "primeng/api";
import { AbstractLog, EventTemplate, EventType, Log } from "../models";
import { version } from '../../../environments/build'

export const toJSON = (values: any[], key: string, light: boolean, pretify: boolean) => {
    const lighten = (value: any): any => {
        if (Array.isArray(value)) {
            return (<any[]>value).map(obj => lighten(obj))
        }
        const lightened: any = {};
        Object.keys(value).map(key => {
            if (Array.isArray(value[key]) && !!value[key].length) {
                lightened[key] = (<any[]>value[key]).map(obj => lighten(obj))
            } else if (typeof value[key] === "object" && value[key] !== null && !!Object.keys(value[key]).length) {
                lightened[key] = lighten(value[key]);
            } else if (key !== 'key' && !!value[key]) {
                lightened[key] = value[key];
            }
        });
        return lightened;
    }
    return JSON.stringify({ version, [key]: light ? lighten(values) : values }, pretify && null, pretify && 2);
}

export const groupByKey = <T>(list: any, key: string): { [key: string]: T[] } => list.reduce((prev: any, { [key]: value, ...rest }) => ({
    ...prev,
    [value]: ( prev[value] || [] ).concat({ [key]: value, ...rest })
}), {})

export const reorderLogs = (values: Log[]) => !!values.length ? values.map<Log>((value, index, array) => ({
    ...value,
    prev: index === 0 ? null : array[index - 1].id
})) : values;

export const orderedLogs = (values: Log[]) => {
    if (!values?.length) return values;
    try {
        const orderedValeus = [ values.find(log => log.prev === null) ];
        while (orderedValeus.length < values.length) {
            orderedValeus.push(values.find(value => value.prev === orderedValeus[orderedValeus.length - 1].id))
        }
        return orderedValeus;
    } catch (err) {
        console.error(err);
        return reorderLogs(values);
    }
}

export const compareEventTemplates = (a: EventTemplate, b: EventTemplate) => (
    !!a && !!b && (
        a.name.toLocaleLowerCase() === b.name.toLocaleLowerCase() &&
        a.eventType === b.eventType
    )
)


export const deepCompareEventTemplates = (a: EventTemplate, b: EventTemplate) => (
    compareEventTemplates(a, b) &&
    a.icon.value === b.icon.value &&
    a.color === b.color
)

export const compareAbstractLog = (a: AbstractLog, b: AbstractLog, id?: string) => (
    a.title.toLocaleLowerCase() === b.title.toLocaleLowerCase() &&
    a.desc?.toLocaleLowerCase() === b.desc?.toLocaleLowerCase() && (
        !(<Log>a).logTemplateId || !(<Log>b).logTemplateId ||
        (<Log>a).logTemplateId === (<Log>b).logTemplateId
    ) && (!id ||  (<Log>a).logTemplateId && (<Log>a).logTemplateId === id)
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