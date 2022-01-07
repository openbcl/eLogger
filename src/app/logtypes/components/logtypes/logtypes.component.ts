import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadLogTypes, createLogType } from '../../store/logtype.actions';
import { logTypesProcessingSelector, logTypesSelector } from '../../store/logtype.selectors';

@Component({
  selector: 'el-logtypes',
  templateUrl: './logtypes.component.html',
  styleUrls: ['./logtypes.component.scss']
})
export class LogTypesComponent implements OnInit {

  searchTerm = '';
  displayNewLogTypeDialog = false;

  logTypes$ = this.store.pipe(select(logTypesSelector), map(logTypes => [ ...logTypes ]));
  logTypesLoading$ = this.store.pipe(select(logTypesProcessingSelector));

  newLogTypeForm = this.fb.group({
    title: ['', Validators.required],
    desc: ''
  });

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'revision', header: 'Created/Modified' }
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogTypes());
  }

  submitNewLogType() {
    this.store.dispatch(createLogType(this.newLogTypeForm.value));
    this.displayNewLogTypeDialog = false;
    this.newLogTypeForm.reset();
  }

}
