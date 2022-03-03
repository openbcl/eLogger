import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { patchLogTemplate } from '../../store/logtemplate.actions';
import { BasicDialogComponent } from '../../shared/components/basicdialog.component';
import { SharedLogTemplates } from '../../shared/models';

@Component({
  selector: 'el-import-logtemplates-dialog',
  templateUrl: './importlogtemplatesdialog.component.html',
  styleUrls: ['./importlogtemplatesdialog.component.scss']
})
export class ImportLogTemplatesDialogComponent extends BasicDialogComponent {

  @ViewChild('fileUpload')
  fileUpload: FileUpload;

  constructor(private store: Store) {
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
      const obj = JSON.parse(data);
      if (!!obj?.version?.length && !!obj?.logTemplates?.length) {
        const partialLogTemplates: SharedLogTemplates = obj;
        switch (partialLogTemplates.version) {
          default:
            partialLogTemplates.logTemplates.forEach(logTemplate => {
              this.store.dispatch(patchLogTemplate({ logTemplate }));
            });
        }
        this.fileUpload.clear();
        return this.close();
      }
    }
    this.raiseError('The input file has an incompatible format.')
  }

  raiseError(msg: string) {
    // TODO: UI error message
    console.error(msg)
  }

}