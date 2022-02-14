import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadLogTemplates } from '../../../store/logtemplate.actions';
import { logTemplatesProcessingSelector, logTemplatesSelector } from '../../../store/logtemplate.selectors';

@Component({
  selector: 'el-logtemplates',
  templateUrl: './logtemplates.component.html',
  styleUrls: ['./logtemplates.component.scss']
})
export class LogTemplatesComponent implements OnInit {

  searchTerm = '';
  displayCreateLogTemplateDialog = false;

  logTemplates$ = this.store.pipe(select(logTemplatesSelector), map(logTemplates => [ ...logTemplates ]));
  logTemplatesLoading$ = this.store.pipe(select(logTemplatesProcessingSelector));

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'revision', header: 'Created/Modified' }
  ];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogTemplates());
  }

}
