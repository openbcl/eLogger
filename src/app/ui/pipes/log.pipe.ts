import { Pipe, PipeTransform } from '@angular/core';
import { LogTemplate } from '../../shared/models';

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