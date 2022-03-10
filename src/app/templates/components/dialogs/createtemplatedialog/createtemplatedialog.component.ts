import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { templatesSelector } from '../../../../store/template.selectors';
import { AppValidators, abstractLogIsUniqueError } from '../../../../shared/utils/validators';
import { createTemplate } from '../../../store/template.actions';
import { BaseDialogComponent } from '../../../../shared/components/basedialog.component';

@Component({
  selector: 'el-create-template-dialog',
  templateUrl: './createtemplatedialog.component.html',
  styleUrls: ['./createtemplatedialog.component.scss']
})
export class CreateTemplateDialogComponent extends BaseDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(this.store.pipe(select(templatesSelector)))
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
    this.store.dispatch(createTemplate(this.form.value));
    this.close();
  }

}
