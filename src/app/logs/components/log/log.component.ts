import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { loadRecords } from '../../../store/record.actions';
import { recordsProcessingSelector, recordsSelector } from '../../../store/record.selectors';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplatesSelector } from '../../../store/logtemplate.selectors';
import { loadLog } from '../../store/log.actions';
import { logSelector } from '../../store/log.selectors';

@Component({
  selector: 'el-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  displayUpdateLogDialog = false;
  displayDeleteLogDialog = false;

  log$ = this.store.pipe(select(logSelector), filter(log => !!log));
  records$ = this.log$.pipe(switchMap(log => this.store.select(recordsSelector(log.id))));
  logTemplates$ = this.store.pipe(select(logTemplatesSelector));
  recordsLoading$ = this.store.pipe(select(recordsProcessingSelector));

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'date', header: 'Timestamp' }
  ];

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadRecords({ logId: id }));
    this.store.dispatch(loadLog({ id }));
    this.store.dispatch(loadLogTemplates());
  }

}
