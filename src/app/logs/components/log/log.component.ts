import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { loadRecords } from '../../../store/record.actions';
import { recordsSelector } from '../../../store/record.selectors';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplatesSelector } from '../../../store/logtemplate.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';
import { Log, Record } from '../../../shared/models';
import { ExportService } from '../../../shared/services/export.service';

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
    private activeRoute: ActivatedRoute,
    private exportService: ExportService
  ) { }
  
  ngOnInit(): void {
    this.logId = this.activeRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadRecords({ logId: this.logId }));
    this.store.dispatch(loadLog({ id: this.logId }));
    this.store.dispatch(loadLogTemplates());
  }

  shareRecords(records: Record[], log: Log) {
    this.exportService.exportCSV(records, log);
  }

}
