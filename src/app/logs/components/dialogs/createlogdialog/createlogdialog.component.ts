import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { logsSelector } from '../../../../store/log.selectors';
import { AppValidators, abstractLogIsUniqueError } from '../../../../shared/utils/validators';
import { logTemplatesSelector } from '../../../../store/logtemplate.selectors';
import { createLog } from '../../../store/log.actions';

@Component({
  selector: 'el-create-log-dialog',
  templateUrl: './createlogdialog.component.html',
  styleUrls: ['./createlogdialog.component.scss']
})
export class CreateLogDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  logTemplates$ = this.store.pipe(select(logTemplatesSelector));

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null,
    logTemplateId: [null, Validators.required],
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(this.store.pipe(select(logsSelector)))
  });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.form.reset();
  }

  submit() {
    this.store.dispatch(createLog(this.form.value));
    this.close();
  }

}
