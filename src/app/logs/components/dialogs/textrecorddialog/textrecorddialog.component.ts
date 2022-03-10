import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { EventTemplate } from '../../../../models';
import { logIdSelector } from '../../../../store/router.selector';
import { filter } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';

@Component({
  selector: 'el-text-record-dialog',
  templateUrl: './textrecorddialog.component.html',
  styleUrls: ['./textrecorddialog.component.scss']
})
export class TextRecordDialogComponent extends BaseDialogComponent {

  @Input()
  textEventTemplate: EventTemplate;

  @Input()
  timestamp: Date;

  logId$ = this.store.pipe(select(logIdSelector), filter(logId => !!logId));

  form = this.fb.group({ text: [null, Validators.required] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  submit(logId: string) {
    this.store.dispatch(createRecord({
      eventTemplate: this.textEventTemplate,
      logId,
      date: this.timestamp,
      text: this.form.value.text
    }));
    this.close();
  }

  override close() {
    super.close();
    this.form.reset();
  }

}
