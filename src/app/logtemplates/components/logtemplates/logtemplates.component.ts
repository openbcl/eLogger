import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { loadLogTemplates, createLogTemplate } from '../../store/logtemplate.actions';
import { logTemplatesProcessingSelector, logTemplatesSelector } from '../../store/logtemplate.selectors';

@Component({
  selector: 'el-logtemplates',
  templateUrl: './logtemplates.component.html',
  styleUrls: ['./logtemplates.component.scss']
})
export class LogTemplatesComponent implements OnInit {

  searchTerm = '';
  displayNewLogTemplateDialog = false;

  logTemplates$ = this.store.pipe(select(logTemplatesSelector), map(logTemplates => [ ...logTemplates ]));
  logTemplatesLoading$ = this.store.pipe(select(logTemplatesProcessingSelector));

  createLogTemplateForm = this.fb.group({
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
    this.store.dispatch(loadLogTemplates());
  }

  submitLogTemplate() {
    this.store.dispatch(createLogTemplate(this.createLogTemplateForm.value));
    this.displayNewLogTemplateDialog = false;
    this.createLogTemplateForm.reset();
  }

}
