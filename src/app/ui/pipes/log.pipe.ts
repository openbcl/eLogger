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