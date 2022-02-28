import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { EventTemplate } from '../../../../shared/models';
import { logIdSelector } from '../../../../store/router.selector';

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
  textEventTemplate: EventTemplate;

  @Input()
  timestamp: Date;

  logId$ = this.store.pipe(select(logIdSelector));

  form = this.fb.group({ text: [null, Validators.required] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  submit(logId: string) {
    this.store.dispatch(createRecord({
      eventTemplate: this.textEventTemplate,
      logId,
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
