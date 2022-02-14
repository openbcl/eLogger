import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { logTemplatesSelector } from '../../../store/logtemplate.selectors';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { loadLogs } from '../../../store/log.actions';
import { logsProcessingSelector, logsSelector } from '../../../store/log.selectors';
import { Log } from '../../../shared/models';

@Component({
  selector: 'el-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  searchTerm = '';
  displayCreateLogDialog = false;
  deleteLog: Log;

  isMobileLayout = false;

  logs$ = this.store.pipe(select(logsSelector), map(logs => [ ...logs ]));
  logsLoading$ = this.store.pipe(select(logsProcessingSelector));
  logTemplates$ = this.store.pipe(select(logTemplatesSelector));

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'type', header: 'Type' },
    { field: 'records', header: 'Records' }
  ];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogs());
    this.store.dispatch(loadLogTemplates());
    this.isMobileLayout = window.innerWidth < 961;
    window.onresize = () => this.isMobileLayout = window.innerWidth < 961;
  }

}
