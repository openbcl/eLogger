import { Component, Input } from '@angular/core';
import { ExportService } from '../../../services/export.service';
import { Log, Template } from '../../../models';
import { FormBuilder, Validators } from '@angular/forms';
import { AppValidators, isQRcodeCompatibleError } from '../../../utils/validators';
import { BaseDialogComponent } from '../../basedialog/basedialog.component';

@Component({
  selector: 'el-export-logs-dialog',
  templateUrl: './exportlogsdialog.component.html',
  styleUrls: ['./exportlogsdialog.component.scss']
})
export class ExportLogsDialogComponent extends BaseDialogComponent {

  isQRcodeCompatibleError = isQRcodeCompatibleError;
  displayQRcodeDialog = false;

  breakpoint = 500;

  @Input()
  logs: Log[];

  @Input()
  templates: Template[];
  
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
  ) {
    super();
  }

  override close() {
    super.close();
    this.form.patchValue({logs: []});
  }

  download() {
    this.exportService.exportLogs(this.logs)
    this.close();
  }

}
