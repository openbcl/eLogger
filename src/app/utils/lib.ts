import { SelectItem, PrimeIcons } from "primeng/api";
import { BaseLog, EventTemplate, EventType, Log } from "../models";
import { version } from '../../environments/build'

export const titleCol = { field: 'title', header: $localize`:Title column@@lib\:titleColumn:Title` };
export const descCol = { field: 'desc', header: $localize`:Description column@@lib\:descriptionColumn:Description` };
export const typeCol = { field: 'type', header: $localize`:Type column@@lib\:typeColumn:Type` };
export const recordsCol = { field: 'records', header: $localize`:Records column@@lib\:RecordsColumn:Records`, class: 'text-center' };
export const iconCol = { field: 'icon', header: $localize`:Icon column@@lib\:iconColumn:Icon` };
export const nameCol = { field: 'name', header: $localize`:Name column@@lib\:nameColumn:Name` };
export const absTimeCol = { field: 'date', header: $localize`:Absolute time column@@lib\:absTimeCol:Absolute Time`, styleClass: 'text-center' };
export const revisionCol = { field: 'revision', header: $localize`:Modified column@@lib\:modifiedColumn:Created/Modified` }
export const eventTypeCol = { field: 'eventType', header: $localize`:Event type column@@lib\:eventTypeColumn:Type` };


export const mediaDevicesError = {
    summary: $localize`:No camera/microphone access error headline@@lib\:mediaErrorHeadline:Browser feature "navigator.mediaDevices.getUserMedia" not available!`,
    detail: $localize`:No camera/microphone access error details@@lib\:mediaErrorDetails:Reason: insecure connection (no https) or incompatible browser`
} 

export const isBaseLogTitleEqual = (existingTitle: string, importedTitle: string) => {
    return existingTitle === importedTitle ||
        existingTitle.startsWith(importedTitle) &&
        existingTitle.split(importedTitle)[1].match(/\s\[\d+\]/)
}

export const uniqueBaseLog = <T>(value: BaseLog, baseLogs: BaseLog[]): T => {
    const count = baseLogs.filter(baseLog =>
        baseLog.id !== value.id && baseLog.desc === value.desc && isBaseLogTitleEqual(baseLog.title, value.title)
    ).map(baseLog => {
        if (baseLog.title === value.title) {
        return 0;
        }
        const match = baseLog.title.split(value.title)[1].match(/\s\[(\d+)\]/);
        return match ? parseInt(match[1]) + 1 : 0
    }).reduce((prev, current) => current > prev ? current : prev, 2)
    return {
        ...value, title: `${value.title} [${count}]`
    } as unknown as T
};

export const toJSON = (value: any, key: string, light: boolean, pretify: boolean) => {
    const lighten = (obj: any): any => {
        if (Array.isArray(obj)) {
            return (<any[]>obj).map(obj => lighten(obj))
        }
        const lightened: any = {};
        Object.keys(obj).map(key => {
            if (Array.isArray(obj[key])) {
                if (!!obj[key].length) {
                    lightened[key] = (<any[]>obj[key]).map(obj => lighten(obj))
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null && !!Object.keys(obj[key]).length) {
                lightened[key] = lighten(obj[key]);
            } else if (key !== 'key' && !!obj[key]) {
                lightened[key] = obj[key];
            }
        });
        return lightened;
    }
    return JSON.stringify({ version, [key]: light ? lighten(value) : value }, pretify && null, pretify && 2);
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
    !!a && !!b && a.name.toLocaleLowerCase() === b.name.toLocaleLowerCase()
)


export const deepCompareEventTemplates = (a: EventTemplate, b: EventTemplate) => (
    compareEventTemplates(a, b) &&
    a.eventType === b.eventType &&
    a.icon.value === b.icon.value &&
    a.color === b.color
)

export const compareAbstractLog = (a: BaseLog, b: BaseLog, id?: string) => (
    a.title.toLocaleLowerCase() === b.title.toLocaleLowerCase() &&
    a.desc?.toLocaleLowerCase() === b.desc?.toLocaleLowerCase() && (
        !(<Log>a).templateId || !(<Log>b).templateId ||
        (<Log>a).templateId === (<Log>b).templateId
    ) && (!id ||  (<Log>a).templateId && (<Log>a).templateId === id)
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