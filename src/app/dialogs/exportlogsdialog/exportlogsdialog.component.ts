import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExportService } from '../../shared/services/export.service';
import { Log, LogTemplate } from '../../shared/models';
import { FormBuilder, Validators } from '@angular/forms';
import { AppValidators, isQRcodeCompatibleError } from '../../shared/utils/validators';

@Component({
  selector: 'el-export-logs-dialog',
  templateUrl: './exportlogsdialog.component.html',
  styleUrls: ['./exportlogsdialog.component.scss']
})
export class ExportLogsDialogComponent {

  isQRcodeCompatibleError = isQRcodeCompatibleError;
  displayQRcodeDialog = false;

  breakpoint = 500;

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  logs: Log[];

  @Input()
  logTemplates: LogTemplate[];
  
  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'type', header: 'Type' },
    { field: 'records', header: 'Records', class: 'text-center' }
  ];

  form = this.fb.group({ logs: [[], Validators.required] }, {
    validators: [AppValidators.isQRcodeCompatible('logs')]
  }) 

  constructor(
    private fb: FormBuilder,
    private exportService: ExportService
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.form.patchValue({logs: []});
  }

  download() {
    this.exportService.exportLogs(this.logs)
    this.close();
  }

}
