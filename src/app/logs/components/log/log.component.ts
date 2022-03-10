import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { loadRecords } from '../../../store/record.actions';
import { recordsSelector } from '../../../store/record.selectors';
import { templatesSelector } from '../../../store/template.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { Log, Record } from '../../../shared/models';
import { ExportService } from '../../../shared/services/export.service';
import { logIdSelector } from '../../../store/router.selector';

@Component({
  selector: 'el-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  PrimeIcons = PrimeIcons;

  displayUpdateLogDialog = false;
  displayDeleteLogDialog = false;
  displayDeleteRecordsDialog = false;

  logData = combineLatest([
    this.store.pipe(select(logSelector), filter(log => !!log)),
    this.store.pipe(select(templatesSelector), filter(templates => !!templates)),
    this.store.pipe(select(logIdSelector), filter(logId => !!logId))
  ]).pipe(filter(logData => logData?.[0]?.id === logData?.[2] && !!logData?.[1]?.length));
  log$ = this.logData.pipe(map(logData => logData[0]));
  template$ = this.logData.pipe(map(logData => logData[1].find(template => template.id === logData[0].templateId)));
  records$ = this.log$.pipe(switchMap(log => this.store.select(recordsSelector(log.id))));

  constructor(
    private store: Store,
    private exportService: ExportService
  ) { }
  
  ngOnInit(): void {
    this.store.dispatch(loadRecords({}));
    this.store.dispatch(loadLog({}));
  }

  shareRecords(records: Record[], log: Log) {
    this.exportService.shareRecords(records, log);
  }

}
