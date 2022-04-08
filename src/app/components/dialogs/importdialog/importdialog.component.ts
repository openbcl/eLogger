import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { patchTemplates } from '../../../store/template.actions';
import { BaseDialogComponent } from '../../basedialog/basedialog.component';
import { SharedLogs, SharedTemplates } from '../../../models';
import { patchLogs } from '../../../store/log.actions';
import { toastError } from '../../../store/toast.actions';


@Component({
  selector: 'el-import-dialog',
  templateUrl: './importdialog.component.html',
  styleUrls: ['./importdialog.component.scss']
})
export class ImportDialogComponent extends BaseDialogComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: FileUpload;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  availableDevices: MediaDeviceInfo[];
  hasDevices = false;
  selectedDevice: string;
  formats = [ BarcodeFormat.QR_CODE ];

  importOptions = [{
    label: $localize`:File upload option@@ImportDialogComponent\:fileUploadOption:File Upload`,
    value: false
  }, {
    label: $localize`:QR code option@@ImportDialogComponent\:qrCodeOption:QR code`,
    value: true
  }];

  form = this.fb.group({
    importOption: false,
    deviceCurrent: null as MediaDeviceInfo
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedDevice = localStorage.getItem('qrCamera') || localStorage.getItem('eventCamera') || '';
  }

  camerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = !!devices?.length;
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    if (this.scanner?.device?.deviceId !== this.selectedDevice) {
      localStorage.setItem('qrCamera', this.selectedDevice);
      this.setDevice();
    }
  }

  restoreLastDevice() {
    if (this.scanner?.device?.deviceId !== this.selectedDevice) {
      if (this.selectedDevice === '' && !!this.scanner?.device?.deviceId?.length) {
        this.selectedDevice = this.scanner.device.deviceId;
      }
      this.setDevice();
    }
  }

  setDevice() {
    this.form.patchValue({
      deviceCurrent: this.availableDevices?.find(x => x.deviceId === this.selectedDevice)
    });
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
      isFileReader ? $localize`:File error headline@@ImportDialogComponent\:fileErrorHeadline:Error reading file!` : $localize`:QR code error headline@@ImportDialogComponent\:qrCodeErrorHeadline:Error when scanning QR code!`,
      isFileReader ? $localize`:File error details@@ImportDialogComponent\:fileErrorDetails:The input file has an incompatible format.` : $localize`:QR code error details@@qrCodeErrorDetails\:qrCodeOption:The QR code may have an incompatible format.`
    )
  }

  override close() {
    this.fileUpload?.clear();
    this.form.patchValue({ importOption: false });
    super.close();
  }

  raiseError(summary = $localize`:Scan error headline@@ImportDialogComponent\:scanErrorHeadline:Error when scanning QR code!`, detail = $localize`:Scan error details@@ImportDialogComponent\:scanErrorDetails:An error occured during the scan process.`) {
    this.store.dispatch(toastError({ summary, detail }));
  }

}