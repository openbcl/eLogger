import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from '../../shared/models';

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
      return 'Default'
  }
}