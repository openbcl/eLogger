import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { loadLogs } from '../../../store/log.actions';
import { logsSelector } from '../../../store/log.selectors';
import { EventTemplate, LogTemplate } from '../../../shared/models';
import { loadLogTemplate, updateLogTemplate } from '../../store/logtemplate.actions';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplateProcessingSelector, logTemplateSelector } from '../../store/logtemplate.selectors';

@Component({
  selector: 'el-logtemplate',
  templateUrl: './logtemplate.component.html',
  styleUrls: ['./logtemplate.component.scss']
})
export class LogTemplateComponent implements OnInit {

  searchTerm = '';
  displayCreateEventTemplateDialog = false;
  displayUpdateLogTemplateDialog = false;
  displayDeleteLogTemplateDialog = false;
  deletableEventTemplate: EventTemplate;
  isMobileLayout = false;
  
  logTemplate$ = this.store.pipe(select(logTemplateSelector), filter(logTemplate => !!logTemplate), map(logTemplate => ({ ...logTemplate, eventTemplates: [ ...logTemplate.eventTemplates ] })));
  logTemplateLoading$ = this.store.pipe(select(logTemplateProcessingSelector), take(2));
  logTemplateNotDeletable$ = this.store.pipe(select(logsSelector), map(logs => logs?.find(log => log.logTemplateId === this.activeRoute.snapshot.paramMap.get('id'))));

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'eventType', header: 'Type' },
    { field: 'icon', header: 'Icon' }
  ];

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogs());
    this.store.dispatch(loadLogTemplates());
    this.store.dispatch(loadLogTemplate({ id: this.activeRoute.snapshot.paramMap.get('id') }));
    this.isMobileLayout = window.innerWidth < 961;
    window.onresize = () => this.isMobileLayout = window.innerWidth < 961;
  }

  onRowReorder(eventTemplates: EventTemplate[], logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates
      }
    }));
  }

  move(index: number, logTemplate: LogTemplate, ranking: number) {
    if ((index + ranking) >= 0 && (index + ranking) < logTemplate.eventTemplates.length) {
      const eventTemplate = logTemplate.eventTemplates[index];
      const eventTemplates = [ ...logTemplate.eventTemplates ];
      eventTemplates.splice(index, 1);
      eventTemplates.splice(index+ranking, 0, eventTemplate);
      this.onRowReorder(eventTemplates, logTemplate)
    }
  }

}
