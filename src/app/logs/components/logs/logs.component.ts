import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { templatesSelector } from '../../../store/template.selectors';
import { reorderLogs } from '../../../store/log.actions';
import { logsProcessingSelector, logsSelector } from '../../../store/log.selectors';
import { Log } from '../../../models';

@Component({
  selector: 'el-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  searchTerm = '';
  displayCreateLogDialog = false;
  displayShareLogsDialog = false;
  isMobileLayout = false;
  breakpoint = 500;

  logs$ = this.store.pipe(select(logsSelector), map(logs => [ ...logs ]));
  logsLoading$ = this.store.pipe(select(logsProcessingSelector));
  templates$ = this.store.pipe(select(templatesSelector));

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'type', header: 'Type' },
    { field: 'records', header: 'Records', class: 'text-center' }
  ];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth <= this.breakpoint;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= this.breakpoint;
  }

  onRowReorder(logs: Log[]) {
    this.store.dispatch(reorderLogs({ logs }));
  }

  move(index: number, ranking: number, logs: Log[]) {
    if ((index + ranking) >= 0 && (index + ranking) < logs?.length) {
      const log = logs[index];
      const orderedLogs = [ ...logs ];
      orderedLogs.splice(index, 1);
      orderedLogs.splice(index+ranking, 0, log);
      this.onRowReorder(orderedLogs);
    }
  }

}
