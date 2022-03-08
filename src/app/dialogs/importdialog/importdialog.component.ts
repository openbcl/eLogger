import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { patchLogTemplates } from '../../store/logtemplate.actions';
import { BasicDialogComponent } from '../../shared/components/basicdialog.component';
import { SharedLogs, SharedLogTemplates } from '../../shared/models';
import { patchLogs } from '../../store/log.actions';

@Component({
  selector: 'el-import-dialog',
  templateUrl: './importdialog.component.html',
  styleUrls: ['./importdialog.component.scss']
})
export class ImportDialogComponent extends BasicDialogComponent {

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
      fileReader.onload = () => this.patch(fileReader.result);
      fileReader.readAsText(event.files[0]);
    }
  }

  patch(data: any) {
    if (typeof data === 'string') {
      const parsed = JSON.parse(data);
      if (!!parsed?.logTemplates?.length) {
        const partialLogTemplates = parsed as SharedLogTemplates;
        if (!!partialLogTemplates?.version?.length) {
          switch (partialLogTemplates.version) {
            default:
              this.store.dispatch(patchLogTemplates({ logTemplates: partialLogTemplates.logTemplates }));
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
    }
    this.raiseError('The input file has an incompatible format.')
  }

  override close() {
    this.fileUpload?.clear();
    this.scanner?.reset();
    this.form.patchValue({ importOption: false });
    super.close();
  }

  raiseError(msg: string) {
    // TODO: UI error message
    console.error(msg)
  }

}