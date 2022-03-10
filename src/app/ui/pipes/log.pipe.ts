import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { EventType, Template } from '../../models';

@Pipe({
  name: 'templateExists'
})
export class TemplateExistsPipe implements PipeTransform {

  transform(id: string, templates: Template[]): boolean {
    return !!templates?.find(template => template.id === id);
  }

}

@Pipe({
  name: 'templateTitle'
})
export class TemplateTitlePipe implements PipeTransform {

  transform(id: string, templates: Template[]): string {
    return templates?.find(template => template.id === id)?.title || 'Unknown template: Please import the corresponding template first.';
  }

}

@Pipe({
  name: 'templateDesc'
})
export class TemplateDescPipe implements PipeTransform {

  transform(id: string, templates: Template[]): string {
    const desc = templates?.find(template => template.id === id)?.desc;
    return !!desc?.length ? desc : null;
  }

}

@Pipe({
  name: 'logEventTemplates'
})
export class LogEventTemplatesPipe implements PipeTransform {

  transform(template: Template) {
    const containStart = !!template.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.START);
    const containText = !!template.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.TEXT);
    const containAudio = !!template.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.AUDIO);
    const containPicture = !!template.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.PICTURE);
    const containData = containText || containAudio || containPicture;
    const additionalColumns = containStart ? (containData ? 2 : 1) : (containData ? 1 : 0)
    return of({ containStart, containText, containAudio, containPicture, containData, additionalColumns })
  }

}