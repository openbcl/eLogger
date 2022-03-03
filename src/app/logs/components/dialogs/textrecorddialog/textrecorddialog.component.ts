import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { EventTemplate } from '../../../../shared/models';
import { logIdSelector } from '../../../../store/router.selector';
import { filter } from 'rxjs';
import { BasicDialogComponent } from '../../../../shared/components/basicdialog.component';

@Component({
  selector: 'el-text-record-dialog',
  templateUrl: './textrecorddialog.component.html',
  styleUrls: ['./textrecorddialog.component.scss']
})
export class TextRecordDialogComponent extends BasicDialogComponent {

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
