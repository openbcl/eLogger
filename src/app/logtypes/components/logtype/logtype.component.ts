import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { LogType } from '../../../shared/models';
import { loadLogType, updateLogType } from '../../store/logtype.actions';
import { logTypeProcessingSelector, logTypeSelector } from '../../store/logtype.selectors';

@Component({
  selector: 'el-logtype',
  templateUrl: './logtype.component.html',
  styleUrls: ['./logtype.component.scss']
})
export class LogTypeComponent implements OnInit {

  searchTerm = '';
  displayNewEventTemplateDialog = false;
  displayUpdateLogTypeDialog = false;

  logType$ = this.store.pipe(select(logTypeSelector), filter(logType => !!logType), map(logType => ({ ...logType, eventTemplates: [ ...logType.eventTemplates ] })));
  logTypeLoading$ = this.store.pipe(select(logTypeProcessingSelector));

  updateLogTypeForm = this.fb.group({
    title: ['', Validators.required],
    desc: ''
  });

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'eventType', header: 'Type' }
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogType({ id: this.route.snapshot.paramMap.get('id') }));
  }

  updateLogType(logType: LogType) {
    this.updateLogTypeForm.setValue({
      title: logType.title,
      desc: logType.desc
    });
    this.displayUpdateLogTypeDialog = true;
  }

  submitUpdatedLogType(logType: LogType) {
    this.store.dispatch(updateLogType({
      logType: {
        ...logType,
        ...this.updateLogTypeForm.value
      }
    }));
    this.displayUpdateLogTypeDialog = false;
    this.updateLogTypeForm.reset();
  }
}
