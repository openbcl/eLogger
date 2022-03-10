import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, interval, of } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { EventTemplate, EventType } from '../../../models';
import { createRecord, loadRecords } from '../../../store/record.actions';
import { templatesSelector } from '../../../store/template.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { recordsSelector } from '../../../store/record.selectors';
import { CurrentEventRelTimePipe } from '../../../ui/pipes/event.pipe';
import { logIdSelector } from '../../../store/router.selector';

@Component({
  selector: 'el-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  PrimeIcons = PrimeIcons;

  refreshRate = 1000/144;
  displayTextRecordDialog = false;
  timestamp: Date;
  textEventTemplate: EventTemplate;

  logData = combineLatest([
    this.store.pipe(select(logSelector), filter(log => !!log)),
    this.store.pipe(select(templatesSelector), filter(templates => !!templates)),
    this.store.pipe(select(logIdSelector), filter(logId => !!logId))
  ]).pipe(filter(logData => logData?.[0]?.id === logData?.[2] && !!logData?.[1]?.length));
  log$ = this.logData.pipe(map(logData => logData[0]));
  template$ = this.logData.pipe(map(logData => logData[1].find(template => template.id === logData[0].templateId)));
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
    private currentEventRelTime: CurrentEventRelTimePipe
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecords({}));
    this.store.dispatch(loadLog({}));
  }

  raiseEvent(eventTemplate: EventTemplate, logId: string) {
    if (eventTemplate.eventType !== EventType.TEXT) {
      this.store.dispatch(createRecord({
        eventTemplate,
        logId,
        date: new Date()
      }));
    } else {
      this.timestamp = new Date();
      this.textEventTemplate = eventTemplate;
      this.displayTextRecordDialog = true;
    }
  }

}
