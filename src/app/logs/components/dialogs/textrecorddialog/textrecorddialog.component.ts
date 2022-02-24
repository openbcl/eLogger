import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { EventTemplate } from '../../../../shared/models';

@Component({
  selector: 'el-text-record-dialog',
  templateUrl: './textrecorddialog.component.html',
  styleUrls: ['./textrecorddialog.component.scss']
})
export class TextRecordDialogComponent {

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  logId: string;

  @Input()
  textEventTemplate: EventTemplate;

  @Input()
  timestamp: Date;

  form = this.fb.group({ text: [null, Validators.required] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  submit() {
    this.store.dispatch(createRecord({
      eventTemplate: this.textEventTemplate,
      logId: this.logId,
      date: this.timestamp,
      text: this.form.value.text
    }));
    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.form.reset();
  }

}
