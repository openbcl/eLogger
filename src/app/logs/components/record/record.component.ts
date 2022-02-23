import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, interval, of } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { EventTemplate, EventType } from '../../../shared/models';
import { createRecord, loadRecords } from '../../../store/record.actions';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplatesSelector } from '../../../store/logtemplate.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { recordsSelector } from '../../../store/record.selectors';
import { CurrentEventRelTimePipe } from '../../../ui/pipes/event.pipe';

@Component({
  selector: 'el-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  PrimeIcons = PrimeIcons;

  logId: string;
  refreshRate = 1000/144;

  logData = combineLatest([
    this.store.pipe(select(logSelector), filter(log => !!log)),
    this.store.pipe(select(logTemplatesSelector), filter(logTemplates => !!logTemplates))
  ]).pipe(filter(logData => logData?.[0]?.id === this.logId && !!logData?.[1]?.length));
  log$ = this.logData.pipe(map(logData => logData[0]));
  logTemplate$ = this.logData.pipe(map(logData => logData[1].find(logTemplate => logTemplate.id === logData[0].logTemplateId)));
  records$ = this.log$.pipe(switchMap(log => this.store.select(recordsSelector(log.id))));
  absTime$ = interval(this.refreshRate).pipe(map(() => new Date()));
  relTime$ = this.records$.pipe(switchMap(records => {
      if(!records.find(r => r.eventType === EventType.START) || records.find(r => r.eventType === EventType.END || !!records.length && records[records.length - 1].eventType === EventType.PAUSE)) {
        return of(this.currentEventRelTime.transform(records));
      }
      return interval(this.refreshRate).pipe(map(() => this.currentEventRelTime.transform(records)));
  }));

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute,
    private currentEventRelTime: CurrentEventRelTimePipe
  ) { }

  ngOnInit(): void {
    this.logId = this.activeRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadRecords({ logId: this.logId }));
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
