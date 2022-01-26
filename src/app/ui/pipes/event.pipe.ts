import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from '../../shared/models';

@Pipe({
  name: 'eventTypeText'
})
export class EventTypeTextPipe implements PipeTransform {

  transform(eventType: EventType): unknown {
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
        return 'Text;'
      case EventType.PICTURE:
        return 'Picture';
      case EventType.AUDIO:
        return 'Audio';
      default:
        return 'Default'
    }
  }

}

@Pipe({
  name: 'eventTypeIconText'
})
export class EventTypeIconTextPipe implements PipeTransform {

  constructor(private pipe: EventTypeTextPipe) {}

  transform(eventType: EventType): unknown {
    switch(eventType) {
      case EventType.START:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-play' };
      case EventType.PAUSE:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-pause' };
      case EventType.RESUME:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-forward' };
      case EventType.END:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-stop' };
      case EventType.TEXT:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-comments' };
      case EventType.PICTURE:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-camera' };
      case EventType.AUDIO:
        return { label: this.pipe.transform(eventType), icon: 'fas fa-microphone', style: 'width: 16px' };
      default:
        return { label: this.pipe.transform(eventType), icon: 'pi pi-cog' };
    }
  }

}