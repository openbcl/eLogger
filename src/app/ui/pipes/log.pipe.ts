import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { EventType, LogTemplate } from '../../shared/models';

@Pipe({
  name: 'logTemplateExists'
})
export class LogTemplateExistsPipe implements PipeTransform {

  transform(id: string, logTemplates: LogTemplate[]): boolean {
    return !!logTemplates?.find(logTemplate => logTemplate.id === id);
  }

}

@Pipe({
  name: 'logTemplateTitle'
})
export class LogTemplateTitlePipe implements PipeTransform {

  transform(id: string, logTemplates: LogTemplate[]): string {
    return logTemplates?.find(logTemplate => logTemplate.id === id)?.title || 'Unknown log template: Please import the corresponding log template first.';
  }

}

@Pipe({
  name: 'logTemplateDesc'
})
export class LogTemplateDescPipe implements PipeTransform {

  transform(id: string, logTemplates: LogTemplate[]): string {
    const desc = logTemplates?.find(logTemplate => logTemplate.id === id)?.desc;
    return !!desc?.length ? desc : null;
  }

}

@Pipe({
  name: 'logEventTemplates'
})
export class LogEventTemplatesPipe implements PipeTransform {

  transform(logTemplate: LogTemplate) {
    const containStart = !!logTemplate.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.START);
    const containText = !!logTemplate.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.TEXT);
    const containAudio = !!logTemplate.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.AUDIO);
    const containPicture = !!logTemplate.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.PICTURE);
    const containData = containText || containAudio || containPicture;
    const additionalColumns = containStart ? (containData ? 2 : 1) : (containData ? 1 : 0)
    return of({ containStart, containText, containAudio, containPicture, containData, additionalColumns })
  }

}