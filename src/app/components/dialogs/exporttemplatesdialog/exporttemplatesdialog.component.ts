import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExportService } from '../../../services/export.service';
import { Template } from '../../../models';
import { AppValidators, isQRcodeCompatibleError } from '../../../utils/validators';
import { BaseDialogComponent } from '../../basedialog/basedialog.component';

@Component({
  selector: 'el-export-templates-dialog',
  templateUrl: './exporttemplatesdialog.component.html',
  styleUrls: ['./exporttemplatesdialog.component.scss']
})
export class ExportTemplatesDialogComponent extends BaseDialogComponent {

  isQRcodeCompatibleError = isQRcodeCompatibleError;
  displayQRcodeDialog = false;

  breakpoint = 500;

  @Input()
  templates: Template[];

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'revision', header: 'Created/Modified' }
  ];

  form = this.fb.group({ templates: [[], Validators.required] }, {
    validators: [AppValidators.isQRcodeCompatible('templates')]
  }) 

  constructor(
    private fb: FormBuilder,
    private exportService: ExportService
  ) {
    super();
  }

  override close() {
    super.close();
    this.form.patchValue({templates: []});
  }

  download() {
    this.exportService.exportTemplates(this.form.value.templates);
    this.close();
  }

}
