import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Log, LogTemplate } from '../../../../shared/models';
import { ExportService } from '../../../../shared/services/export.service';
import { logsSelector } from '../../../../store/log.selectors';
import { logTemplatesSelector } from '../../../../store/logtemplate.selectors';

@Component({
  selector: 'el-share-logs-dialog',
  templateUrl: './sharelogsdialog.component.html',
  styleUrls: ['./sharelogsdialog.component.scss']
})
export class ShareLogsDialogComponent {

  breakpoint = 500;

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

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
  ) { }

  submit(logTemplates: LogTemplate[]) {
    this.exportService.exportLogs(this.form.value.logs, logTemplates);
    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.form.patchValue({ logs: [] });
  }

}
