import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createLogTemplate } from '../../../store/logtemplate.actions';

@Component({
  selector: 'el-create-logtemplate-dialog',
  templateUrl: './createlogtemplatedialog.component.html',
  styleUrls: ['./createlogtemplatedialog.component.scss']
})
export class CreateLogTemplateDialogComponent {

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  form = this.fb.group({
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
    this.form.reset();
  }

  submit() {
    this.store.dispatch(createLogTemplate(this.form.value));
    this.close();
  }

}
