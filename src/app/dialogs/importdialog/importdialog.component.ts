import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { patchTemplates } from '../../store/template.actions';
import { BaseDialogComponent } from '../../shared/components/basedialog.component';
import { SharedLogs, SharedTemplates } from '../../shared/models';
import { patchLogs } from '../../store/log.actions';
import { toastError } from '../../store/toast.actions';

@Component({
  selector: 'el-import-dialog',
  templateUrl: './importdialog.component.html',
  styleUrls: ['./importdialog.component.scss']
})
export class ImportDialogComponent extends BaseDialogComponent {

  @ViewChild('fileUpload')
  fileUpload: FileUpload;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  formats = [ BarcodeFormat.QR_CODE ];

  importOptions = [{
    label: 'File Upload',
    value: false
  }, {
    label: 'QR code',
    value: true
  }];

  form = this.fb.group({ importOption: false });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    super();
  }

  uploadFiles(event: { files: Blob[] }) {
    if (!!event?.files?.length) {
      const fileReader = new FileReader();
      fileReader.onload = () => this.patch(fileReader.result, true);
      fileReader.readAsText(event.files[0]);
    }
  }

  patch(data: any, isFileReader = false) {
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        if (!!parsed?.templates?.length) {
          const partialTemplates = parsed as SharedTemplates;
          if (!!partialTemplates?.version?.length) {
            switch (partialTemplates.version) {
              default:
                this.store.dispatch(patchTemplates({ templates: partialTemplates.templates }));
            }
            return this.close();
          }
        } if (!!parsed?.logs?.length) {
          const partialLogs = parsed as SharedLogs;
          if (!!partialLogs?.version?.length) {
            switch (partialLogs.version) {
              default:
                this.store.dispatch(patchLogs({ logs: partialLogs.logs }));
            }
            return this.close();
          }
        }
      } catch (err) {}
    }
    this.fileUpload?.clear();
    this.raiseError(
      isFileReader ? 'Error reading file!' : 'Error when scanning QR code!',
      isFileReader ? 'The input file has an incompatible format.' : 'The QR code may have an incompatible format.'
    )
  }

  override close() {
    this.fileUpload?.clear();
    this.scanner?.reset();
    this.form.patchValue({ importOption: false });
    super.close();
  }

  raiseError(summary: string, detail: string) {
    this.store.dispatch(toastError({ summary, detail }));
  }

}