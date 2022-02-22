import { Pipe, PipeTransform } from '@angular/core';
import { EventTemplate, EventType } from '../../shared/models';
import { Record } from '../../shared/models'

@Pipe({
  name: 'eventRelTime'
})
export class EventRelTimePipe implements PipeTransform {

  transform(value: Record, records: Record[]): string {
    switch(value.eventType) {
      case EventType.START:
        return '00:00:00.000'
      default:
        const startEvent = records.find(r => r.eventType === EventType.START);
        if (!startEvent) {
          return '-'
        } else if (startEvent.key < value.key) {
          const accPauseEvents = records.filter(r => r.key < value.key && r.eventType === EventType.PAUSE).reduce((sum, r) => sum + +r.date, 0);
          const accResumeEvents = records.filter(r => r.key <= value.key && r.eventType === EventType.RESUME).reduce((sum, r) => sum + +r.date, 0);
          return new Date(+value.date - +startEvent.date - (accResumeEvents - accPauseEvents)).toISOString().split('T')?.[1]?.slice(0, -1)
        } else {
          return `-${new Date(+startEvent.date - +value.date).toISOString().split('T')?.[1]?.slice(0, -1)}`
        }
    }
  }

}

@Pipe({
  name: 'currentEventRelTime'
})
export class CurrentEventRelTimePipe implements PipeTransform {

  transform(records: Record[]) {
    const startEvent = records.find(r => r.eventType === EventType.START);
    if (!startEvent) {
      return new Date(0)
    }
    const record = records[records.length - 1];
    const accPauseEvents = records.filter(r => r.key < record.key && r.eventType === EventType.PAUSE).reduce((sum, r) => sum + +r.date, 0);
    const accResumeEvents = records.filter(r => r.eventType === EventType.RESUME).reduce((sum, r) => sum + +r.date, 0);
    return new Date(+((record.eventType === EventType.PAUSE || record.eventType === EventType.END) ? record.date : new Date()) - +startEvent.date - (accResumeEvents - accPauseEvents));
  }
}

@Pipe({
  name: 'eventButtonDisabled'
})
export class EventButtonDisabledPipe implements PipeTransform {

  transform(eventTemplate: EventTemplate, records: Record[]) {
    switch(eventTemplate.eventType) {
      case EventType.START:
        return !!records.find(r => r.eventType === EventType.START);
      case EventType.PAUSE:
        return !records.find(r => r.eventType === EventType.START) || !records.length || records[records.length - 1].eventType === EventType.PAUSE || !!records.find(r => r.eventType === EventType.END)
      case EventType.RESUME:
        return !records.length || records[records.length - 1].eventType !== EventType.PAUSE
      case EventType.END:
        return !records.length || records[records.length - 1].eventType === EventType.PAUSE || !records.find(r => r.eventType === EventType.START) || !!records.find(r => r.eventType === EventType.END)
      default:
        return !!records.length && (records[records.length - 1].eventType === EventType.PAUSE || records[records.length - 1].eventType === EventType.END)
    }
  }

}

@Pipe({
  name: 'eventLabel'
})
export class EventLabelPipe implements PipeTransform {

  transform(eventType: EventType): string {
    return eventLabel(eventType);
  }

}

@Pipe({
  name: 'eventLabelWithIcon'
})
export class EventLabelWithIconPipe implements PipeTransform {

  transform(eventType: EventType) {
    switch(eventType) {
      case EventType.START:
        return { label: eventLabel(eventType), value: 'pi pi-play' };
      case EventType.PAUSE:
        return { label: eventLabel(eventType), value: 'pi pi-pause' };
      case EventType.RESUME:
        return { label: eventLabel(eventType), value: 'pi pi-forward' };
      case EventType.END:
        return { label: eventLabel(eventType), value: 'pi pi-stop' };
      case EventType.TEXT:
        return { label: eventLabel(eventType), value: 'pi pi-comments' };
      case EventType.PICTURE:
        return { label: eventLabel(eventType), value: 'pi pi-camera' };
      case EventType.AUDIO:
        return { label: eventLabel(eventType), value: 'fas fa-microphone', styleClass: 'el-icon-w16' };
      default:
        return { label: eventLabel(eventType), value: 'pi pi-cog' };
    }
  }

}

const eventLabel = (eventType: EventType): string => {
  switch(eventType) {
    case EventType.START:
      return 'Start';
    case EventType.PAUSE:
      return 'Pause';
    case EventType.RESUME:
      return 'Resume';
    case EventType.END:
      return 'End';
    case EventType.TEXT:
      return 'Text'
    case EventType.PICTURE:
      return 'Picture';
    case EventType.AUDIO:
      return 'Audio';
    default:
      return 'Custom'
  }
}