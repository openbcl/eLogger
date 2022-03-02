import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExportService } from '../../shared/services/export.service';
import { LogTemplate } from '../../shared/models';
import { AppValidators, isQRcodeCompatibleError } from '../../shared/utils/validators';

@Component({
  selector: 'el-export-logtemplates-dialog',
  templateUrl: './exportlogtemplatesdialog.component.html',
  styleUrls: ['./exportlogtemplatesdialog.component.scss']
})
export class ExportLogTemplatesDialogComponent {

  isQRcodeCompatibleError = isQRcodeCompatibleError;
  displayQRcodeDialog = false;

  breakpoint = 500;

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  logTemplates: LogTemplate[];

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'revision', header: 'Created/Modified' }
  ];

  form = this.fb.group({ logTemplates: [[], Validators.required] }, {
    validators: [AppValidators.isQRcodeCompatible('logTemplates')]
  }) 

  constructor(
    private fb: FormBuilder,
    private exportService: ExportService
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  download() {
    this.exportService.exportLogTemplates(this.form.value.logTemplates);
    this.close();
  }

}
