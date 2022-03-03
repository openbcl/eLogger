import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BasicDialogComponent } from '../../../../shared/components/basicdialog.component';
import { LogTemplate } from '../../../../shared/models';
import { ExportService } from '../../../../shared/services/export.service';
import { logsSelector } from '../../../../store/log.selectors';
import { logTemplatesSelector } from '../../../../store/logtemplate.selectors';

@Component({
  selector: 'el-share-logs-dialog',
  templateUrl: './sharelogsdialog.component.html',
  styleUrls: ['./sharelogsdialog.component.scss']
})
export class ShareLogsDialogComponent extends BasicDialogComponent {

  breakpoint = 500;

  logs$ = this.store.pipe(select(logsSelector), map(logs => [ ...logs ]));
  logTemplates$ = this.store.pipe(select(logTemplatesSelector));

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'type', header: 'Type' },
    { field: 'records', header: 'Records', class: 'text-center' }
  ];

  form = this.fb.group({ logs: [[], Validators.required] }) 

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private exportService: ExportService
  ) {
    super();
  }

  submit(logTemplates: LogTemplate[]) {
    this.exportService.shareLogs(this.form.value.logs, logTemplates);
    this.close();
  }

  override close() {
    super.close();
    this.form.patchValue({ logs: [] });
  }

}
