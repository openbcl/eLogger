import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventTemplate, EventType } from '../../models';
import { Record } from '../../models'

@Pipe({
  name: 'eventRelTime'
})
export class EventRelTimePipe implements PipeTransform {

  transform(value: Record, records: Record[]) {
    const prefixPositiv = '';
    const prefixNegativ = '-';
    switch(value.eventType) {
      case EventType.START:
        return { prefix: prefixPositiv, days: 0, time: new Date(0) };
      default:
        const startEvent = records.find(r => r.eventType === EventType.START);
        if (!startEvent) {
          return { prefix: prefixNegativ, days: null, time: null };
        } else if (startEvent.key < value.key) {
          const accPauseEvents = records.filter(r => r.key < value.key && r.eventType === EventType.PAUSE).reduce((sum, r) => sum + +r.date, 0);
          const accResumeEvents = records.filter(r => r.key <= value.key && r.eventType === EventType.RESUME).reduce((sum, r) => sum + +r.date, 0);
          const time = new Date(+value.date - +startEvent.date - (accResumeEvents - accPauseEvents));
          return { prefix: prefixPositiv, days: Math.trunc(+time / 86400000), time }
        } else {
          const time = new Date(+startEvent.date - +value.date);
          return { prefix: prefixNegativ, days: Math.trunc(+time / 86400000), time }
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

  transform(eventType: EventType, localize = true): string {
    return eventLabel(eventType, localize);
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
      case EventType.PHOTO:
        return { label: eventLabel(eventType), value: 'pi pi-camera' };
      case EventType.AUDIO:
        return { label: eventLabel(eventType), value: 'fas fa-microphone', styleClass: 'el-icon-w16' };
      default:
        return { label: eventLabel(eventType), value: 'pi pi-cog' };
    }
  }

}

@Pipe({
  name: 'bypassSecurityTrustUrl'
})
export class BypassSecurityTrustUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}

const eventLabel = (eventType: EventType, localize = true): string => {
  switch(eventType) {
    case EventType.START:
      return localize ? $localize`:Start label@@EventLabelPipe\:start:Start` : 'Start';
    case EventType.PAUSE:
      return localize ? $localize`:Pause label@@EventLabelPipe\:pause:Pause` : 'Pause';
    case EventType.RESUME:
      return localize ? $localize`:Resume label@@EventLabelPipe\:resume:Resume` : 'Resume';
    case EventType.END:
      return localize ? $localize`:End label@@EventLabelPipe\:end:End` : 'End';
    case EventType.TEXT:
      return localize ? $localize`:Text label@@EventLabelPipe\:text:Text` : 'Text';
    case EventType.PHOTO:
      return localize ? $localize`:Photo label@@EventLabelPipe\:photo:Photo` : 'Photo';
    case EventType.AUDIO:
      return localize ? $localize`:Audio label@@EventLabelPipe\:audio:Audio` : 'Audio';
    default:
      return localize ? $localize`:Custom label@@EventLabelPipe\:custom:Custom` : 'Custom';
  }
}