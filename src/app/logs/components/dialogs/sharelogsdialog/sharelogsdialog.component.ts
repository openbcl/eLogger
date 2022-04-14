import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { Template } from '../../../../models';
import { logsSelector } from '../../../../store/log.selectors';
import { templatesSelector } from '../../../../store/template.selectors';
import { shareLogs } from '../../../../store/share.actions';
import { titleCol, descCol, typeCol, recordsCol } from '../../../../utils/lib';

@Component({
  selector: 'el-share-logs-dialog',
  templateUrl: './sharelogsdialog.component.html',
  styleUrls: ['./sharelogsdialog.component.scss']
})
export class ShareLogsDialogComponent extends BaseDialogComponent {

  logs$ = this.store.pipe(select(logsSelector), map(logs => [ ...logs ]));
  templates$ = this.store.pipe(select(templatesSelector));

  cols: any[] = [ titleCol, descCol, typeCol, recordsCol ];

  form = this.fb.group({ logs: [[], Validators.required] }) 

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  submit(templates: Template[]) {
    this.store.dispatch(shareLogs({
      logs: this.form.value.logs,
      templates
    }))
    this.close();
  }

  override close() {
    super.close();
    this.form.patchValue({ logs: [] });
  }

}
