import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { logsSelector } from '../../../store/log.selectors';
import { EventTemplate, Template } from '../../../models';
import { loadTemplate, updateTemplate } from '../../store/template.actions';
import { templateProcessingSelector, templateSelector } from '../../store/template.selectors';
import { templateIdSelector } from '../../../store/router.selector';

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
  isMobileLayout = false;
  
  template$ = this.store.pipe(select(templateSelector), filter(template => !!template), map(template => ({ ...template, eventTemplates: [ ...template.eventTemplates ] })));
  templateLoading$ = this.store.pipe(select(templateProcessingSelector), take(2));
  templateNotDeletable$ = this.store.pipe(
    select(templateIdSelector),
    filter(templateId => !!templateId),
    switchMap(templateId => 
      this.store.pipe(
        select(logsSelector),
        map(logs => logs?.find(log => log.templateId === templateId))
      )
    )
  );

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'eventType', header: 'Type' },
    { field: 'icon', header: 'Icon' }
  ];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadTemplate({}));
    this.isMobileLayout = window.innerWidth < 961;
    window.onresize = () => this.isMobileLayout = window.innerWidth < 961;
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

}
