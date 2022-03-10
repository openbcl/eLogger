import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { logsSelector } from '../../../../store/log.selectors';
import { AppValidators, abstractLogIsUniqueError } from '../../../../shared/utils/validators';
import { templatesSelector } from '../../../../store/template.selectors';
import { createLog } from '../../../store/log.actions';
import { BaseDialogComponent } from '../../../../shared/components/basedialog.component';

@Component({
  selector: 'el-create-log-dialog',
  templateUrl: './createlogdialog.component.html',
  styleUrls: ['./createlogdialog.component.scss']
})
export class CreateLogDialogComponent extends BaseDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  templates$ = this.store.pipe(select(templatesSelector));

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null,
    templateId: [null, Validators.required],
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(this.store.pipe(select(logsSelector)))
  });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  override close() {
    super.close();
    this.form.reset();
  }

  submit() {
    this.store.dispatch(createLog(this.form.value));
    this.close();
  }

}
