import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { EventTemplate, LogTemplate } from '../../../shared/models';
import { loadLogTemplate, loadLogTemplates, updateLogTemplate } from '../../store/logtemplate.actions';
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
  
  logTemplate$ = this.store.pipe(select(logTemplateSelector), filter(logTemplate => !!logTemplate), map(logTemplate => ({ ...logTemplate, eventTemplates: [ ...logTemplate.eventTemplates ] })));
  logTemplateLoading$ = this.store.pipe(select(logTemplateProcessingSelector));
  
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
    this.store.dispatch(loadLogTemplates());
    this.store.dispatch(loadLogTemplate({ id: this.activeRoute.snapshot.paramMap.get('id') }));
  }

  onRowReorder(eventTemplates: EventTemplate[], logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates
      }
    }));
  }

}
