import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from '../../shared/models';

@Pipe({
  name: 'eventTypeText'
})
export class EventTypeTextPipe implements PipeTransform {

  transform(eventType: EventType): string {
    return eventTypeLabel(eventType);
  }

}

@Pipe({
  name: 'eventTypeIconText'
})
export class EventTypeIconTextPipe implements PipeTransform {

  transform(eventType: EventType) {
    return eventTypeLabelWithIcon(eventType);
  }

}

@Pipe({
  name: 'eventTypesIconText'
})
export class EventTypesIconTextPipe implements PipeTransform {

  transform(eventTypes: EventType[]): any[] {
    return eventTypes.map(eventType => eventTypeLabelWithIcon(eventType));
  }

}

const eventTypeLabel = (eventType: EventType): string => {
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

const eventTypeLabelWithIcon = (eventType: EventType) => {
  switch(eventType) {
    case EventType.START:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-play' };
    case EventType.PAUSE:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-pause' };
    case EventType.RESUME:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-forward' };
    case EventType.END:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-stop' };
    case EventType.TEXT:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-comments' };
    case EventType.PICTURE:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-camera' };
    case EventType.AUDIO:
      return { label: eventTypeLabel(eventType), icon: 'fas fa-microphone', style: 'width: 16px' };
    default:
      return { label: eventTypeLabel(eventType), icon: 'pi pi-cog' };
  }
}