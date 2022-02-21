import { Pipe, PipeTransform } from '@angular/core';
import { EventType, LogTemplate } from '../../shared/models';

@Pipe({
  name: 'logTemplateTitle'
})
export class LogTemplateTitlePipe implements PipeTransform {

  transform(id: string, logTemplates: LogTemplate[]): string {
    return logTemplates?.find(logTemplate => logTemplate.id === id)?.title || id;
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
  name: 'logHasStartEvent'
})
export class LogHasStartEvent implements PipeTransform {

  transform(logTemplate: LogTemplate): boolean {
    return !!logTemplate.eventTemplates.find(eventTemplate => eventTemplate.eventType === EventType.START);
  }

}