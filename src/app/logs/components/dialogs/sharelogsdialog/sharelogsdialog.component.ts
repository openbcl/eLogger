import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { Template } from '../../../../models';
import { ExportService } from '../../../../services/export.service';
import { logsSelector } from '../../../../store/log.selectors';
import { templatesSelector } from '../../../../store/template.selectors';

@Component({
  selector: 'el-share-logs-dialog',
  templateUrl: './sharelogsdialog.component.html',
  styleUrls: ['./sharelogsdialog.component.scss']
})
export class ShareLogsDialogComponent extends BaseDialogComponent {

  breakpoint = 500;

  logs$ = this.store.pipe(select(logsSelector), map(logs => [ ...logs ]));
  templates$ = this.store.pipe(select(templatesSelector));

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

  submit(templates: Template[]) {
    this.exportService.shareLogs(this.form.value.logs, templates);
    this.close();
  }

  override close() {
    super.close();
    this.form.patchValue({ logs: [] });
  }

}
