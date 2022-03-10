import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { updateTemplate } from '../../../store/template.actions';
import { AppValidators, abstractLogIsUniqueError } from '../../../../shared/utils/validators';
import { Template } from '../../../../shared/models';
import { templateSelector } from '../../../store/template.selectors';
import { templatesSelector } from '../../../../store/template.selectors';
import { BaseDialogComponent } from '../../../../shared/components/basedialog.component';

@Component({
  selector: 'el-update-template-dialog',
  templateUrl: './updatetemplatedialog.component.html',
  styleUrls: ['./updatetemplatedialog.component.scss']
})
export class UpdateTemplateDialogComponent extends BaseDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(
      this.store.pipe(select(templatesSelector)),
      this.store.pipe(select(templateSelector))
    )
  });
  
  template$ = this.store.pipe(select(templateSelector), filter(template => !!template), tap(template => {
    this.form.patchValue({
      title: template.title,
      desc: template.desc
    });
  }));

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  override close() {
    super.close();
    this.template$.pipe(take(1)).subscribe();
  }

  submit(template: Template) {
    this.store.dispatch(updateTemplate({
      template: {
        ...template,
        ...this.form.value
      }
    }));
    this.close();
  }

}
