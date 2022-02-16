import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { updateLogTemplate } from '../../../store/logtemplate.actions';
import { LogTemplate } from '../../../../shared/models';
import { logTemplateSelector } from '../../../store/logtemplate.selectors';

@Component({
  selector: 'el-update-logtemplate-dialog',
  templateUrl: './updatelogtemplatedialog.component.html',
  styleUrls: ['./updatelogtemplatedialog.component.scss']
})
export class UpdateLogTemplateDialogComponent {

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  logTemplate$ = this.store.pipe(
    select(logTemplateSelector),
    filter(logTemplate => !!logTemplate),
    tap(logTemplate => {
      this.form.setValue({
        title: logTemplate.title,
        desc: logTemplate.desc
      });
    })
  );

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null
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
