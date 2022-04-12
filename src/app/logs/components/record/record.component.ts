import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, interval, of } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { EventTemplate, EventType, Record } from '../../../models';
import { createRecord, loadRecords } from '../../../store/record.actions';
import { templatesSelector } from '../../../store/template.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { recordsSelector } from '../../../store/record.selectors';
import { CurrentEventRelTimePipe } from '../../../ui/pipes/event.pipe';
import { logIdSelector } from '../../../store/router.selector';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'el-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  PrimeIcons = PrimeIcons;

  refreshRate = 1000/60;
  displayTextRecordDialog = false;
  displayPhotoRecordDialog = false;
  displayAudioRecordDialog = false;
  timestamp: Date;
  eventTemplate: EventTemplate;

  logData = combineLatest([
    this.store.pipe(select(logSelector), filter(log => !!log)),
    this.store.pipe(select(templatesSelector), filter(templates => !!templates)),
    this.store.pipe(select(logIdSelector), filter(logId => !!logId))
  ]).pipe(filter(logData => logData?.[0]?.id === logData?.[2] && !!logData?.[1]?.length));
  interval$ = interval(this.refreshRate);
  log$ = this.logData.pipe(map(logData => logData[0]));
  template$ = this.logData.pipe(map(logData => logData[1].find(template => template.id === logData[0].templateId)));
  records$ = this.log$.pipe(switchMap(log => this.store.select(recordsSelector(log.id))));
  absTime$ = this.interval$.pipe(map(() => new Date()));
  relTime$ = this.records$.pipe(switchMap(records => {
      if(!records.find(r => r.eventType === EventType.START) || records.find(r => r.eventType === EventType.END || !!records.length && records[records.length - 1].eventType === EventType.PAUSE)) {
        return of(this.currentEventRelTime.transform(records));
      }
      return this.interval$.pipe(map(() => this.currentEventRelTime.transform(records)));
  }));
  relDays$ = this.relTime$.pipe(filter(relTime => !!relTime), switchMap(relTime => of(Math.trunc(+relTime / 86400000))));
  timeDiff$ = this.records$.pipe(switchMap(records => {
      if(!records.length || [EventType.PAUSE, EventType.END].includes(records[records.length -1].eventType)) {
        return of({ days: 0, time: new Date(0) });
      }
      let preRecord: Record;
      let pausedMilliseconds = 0;
      if (records[records.length -1].eventType === EventType.RESUME) {
        const reversedRecords = [ ...records ].reverse();
        preRecord = reversedRecords.find(record => ![EventType.PAUSE, EventType.RESUME].includes(record.eventType));
        const preRecordIndex = reversedRecords.findIndex(record => record.key === preRecord.key);
        for (let i = 0; i < preRecordIndex; i = i + 2) {
          pausedMilliseconds -= +reversedRecords[i].date - +reversedRecords[i + 1].date;
        }
      }
      return this.interval$.pipe(map(() => {
        const time = records[records.length -1].eventType !== EventType.RESUME ? new Date(+new Date() - +records[records.length -1].date) : new Date(+new Date() - +preRecord.date + pausedMilliseconds);
        return { days: Math.trunc(+time / 86400000), time };
      }));
  }));

  constructor(
    private store: Store,
    private audioService: AudioService,
    private currentEventRelTime: CurrentEventRelTimePipe
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecords({}));
    this.store.dispatch(loadLog({}));
    this.audioService.unlock();
  }

  raiseEvent(eventTemplate: EventTemplate, logId: string) {
    this.eventTemplate = eventTemplate;
    switch(eventTemplate.eventType) {
      case EventType.TEXT:
        this.timestamp = new Date();
        this.displayTextRecordDialog = true;
        break;
      case EventType.PHOTO:
        this.displayPhotoRecordDialog = true;
        break;
      case EventType.AUDIO:
        this.displayAudioRecordDialog = true;
        break;
      default:
        this.store.dispatch(createRecord({
          eventTemplate,
          logId,
          date: new Date()
        }));
    }
  }

}
