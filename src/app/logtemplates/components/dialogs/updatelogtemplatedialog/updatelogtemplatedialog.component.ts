import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { updateLogTemplate } from '../../../store/logtemplate.actions';
import { AppValidators, abstractLogIsUniqueError } from '../../../../shared/utils/validators';
import { LogTemplate } from '../../../../shared/models';
import { logTemplateSelector } from '../../../store/logtemplate.selectors';
import { logTemplatesSelector } from '../../../../store/logtemplate.selectors';
import { BasicDialogComponent } from '../../../../shared/components/basicdialog.component';

@Component({
  selector: 'el-update-logtemplate-dialog',
  templateUrl: './updatelogtemplatedialog.component.html',
  styleUrls: ['./updatelogtemplatedialog.component.scss']
})
export class UpdateLogTemplateDialogComponent extends BasicDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(
      this.store.pipe(select(logTemplatesSelector)),
      this.store.pipe(select(logTemplateSelector))
    )
  });
  
  logTemplate$ = this.store.pipe(select(logTemplateSelector), filter(logTemplate => !!logTemplate), tap(logTemplate => {
    this.form.patchValue({
      title: logTemplate.title,
      desc: logTemplate.desc
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
    this.logTemplate$.pipe(take(1)).subscribe();
  }

  submit(logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        ...this.form.value
      }
    }));
    this.close();
  }

}
