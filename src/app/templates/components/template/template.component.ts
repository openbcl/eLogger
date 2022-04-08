import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { logsSelector } from '../../../store/log.selectors';
import { EventTemplate, Template } from '../../../models';
import { loadTemplate, updateTemplate } from '../../store/template.actions';
import { templateProcessingSelector, templateSelector } from '../../store/template.selectors';
import { templateIdSelector } from '../../../store/router.selector';
import { toastInfo } from '../../../store/toast.actions';
import { nameCol, eventTypeCol, iconCol } from '../../../utils/lib';

@Component({
  selector: 'el-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  searchTerm = '';
  displayCreateEventTemplateDialog = false;
  displayUpdateTemplateDialog = false;
  displayDeleteTemplateDialog = false;
  deletableEventTemplate: EventTemplate;
  
  template$ = this.store.pipe(select(templateSelector), filter(template => !!template), map(template => ({ ...template, eventTemplates: [ ...template.eventTemplates ] })));
  templateLoading$ = this.store.pipe(select(templateProcessingSelector), take(2));
  templateNotDeletable$ = this.store.pipe(
    select(templateIdSelector),
    filter(templateId => !!templateId),
    switchMap(templateId => 
      this.store.pipe(
        select(logsSelector),
        map(logs => !!logs?.find(log => log.templateId === templateId))
      )
    )
  );

  cols: any[] = [nameCol, eventTypeCol, iconCol];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadTemplate({}));
  }

  onRowReorder(eventTemplates: EventTemplate[], template: Template) {
    this.store.dispatch(updateTemplate({
      template: {
        ...template,
        eventTemplates
      }
    }));
  }

  move(index: number, template: Template, ranking: number) {
    if ((index + ranking) >= 0 && (index + ranking) < template.eventTemplates?.length) {
      const eventTemplate = template.eventTemplates[index];
      const eventTemplates = [ ...template.eventTemplates ];
      eventTemplates.splice(index, 1);
      eventTemplates.splice(index+ranking, 0, eventTemplate);
      this.onRowReorder(eventTemplates, template)
    }
  }

  deleteTemplate(templateNotDeletable: boolean) {
    if (templateNotDeletable) {
      this.store.dispatch(toastInfo({
        summary: $localize`:Delete template error headline@@TemplateComponent\:deleteErrorHeadline:Can not delete template!`,
        detail: $localize`:Delete template error details@@TemplateComponent\:deleteErrorDetails:The template is used by a log.`
      }))
    } else {
      this.displayDeleteTemplateDialog = true;
    }
  }

}
