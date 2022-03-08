import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { patchLogTemplates } from '../../store/logtemplate.actions';
import { BasicDialogComponent } from '../../shared/components/basicdialog.component';
import { SharedLogTemplates } from '../../shared/models';
import { FormBuilder } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

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
      fileReader.onload = () => this.patchLogTemplates(fileReader.result);
      fileReader.readAsText(event.files[0]);
    }
  }

  patchLogTemplates(data: any) {
    if (typeof data === 'string') {
      const partialLogTemplates = JSON.parse(data) as SharedLogTemplates;
      if (!!partialLogTemplates?.version?.length && !!partialLogTemplates?.logTemplates?.length) {
        switch (partialLogTemplates.version) {
          default:
            this.store.dispatch(patchLogTemplates({ logTemplates: partialLogTemplates.logTemplates }));
        }
        return this.close();
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