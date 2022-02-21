import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { EventTemplate } from '../../../shared/models';
import { createRecord } from '../../../store/record.actions';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplatesSelector } from '../../../store/logtemplate.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { recordsSelector } from '../../../store/record.selectors';

@Component({
  selector: 'el-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  PrimeIcons = PrimeIcons;

  logId: string;

  logData = combineLatest([
    this.store.pipe(select(logSelector), filter(log => !!log)),
    this.store.pipe(select(logTemplatesSelector), filter(logTemplates => !!logTemplates))
  ]).pipe(filter(logData => logData?.[0]?.id === this.logId && !!logData?.[1]?.length));
  log$ = this.logData.pipe(map(logData => logData[0]));
  logTemplate$ = this.logData.pipe(map(logData => logData[1].find(logTemplate => logTemplate.id === logData[0].logTemplateId)));
  records$ = this.log$.pipe(switchMap(log => this.store.select(recordsSelector(log.id))));

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.logId = this.activeRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadLog({ id: this.logId }));
    this.store.dispatch(loadLogTemplates())
  }

  raiseEvent(eventTemplate: EventTemplate) {
    this.store.dispatch(createRecord({
      eventTemplate,
      logId: this.logId
    }));
  }

}
