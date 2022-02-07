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
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  logTemplate$ = this.store.pipe(
    select(logTemplateSelector),
    filter(logTemplate => !!logTemplate),
    tap(logTemplate => {
      this.updateLogTemplateForm.setValue({
        title: logTemplate.title,
        desc: logTemplate.desc
      });
    })
  );

  updateLogTemplateForm = this.fb.group({
    title: ['', Validators.required],
    desc: ''
  });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitLogTemplate(logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        ...this.updateLogTemplateForm.value
      }
    }));
    this.close();
    this.updateLogTemplateForm.reset();
  }

}
