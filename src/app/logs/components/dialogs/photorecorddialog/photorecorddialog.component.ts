import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { EventTemplate } from '../../../../models';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { createRecord } from '../../../../store/record.actions';
import { toastError } from '../../../../store/toast.actions';
import { qualitySelector } from '../../../../store/setting.selectors';
import { mediaDevicesError } from '../../../../utils/lib';

@Component({
  selector: 'el-photo-record-dialog',
  templateUrl: './photorecorddialog.component.html',
  styleUrls: ['./photorecorddialog.component.scss']
})
export class PhotoRecordDialogComponent extends BaseDialogComponent implements OnInit, OnChanges {

  @Input()
  photoEventTemplate: EventTemplate;

  @Input()
  logId: string;

  @ViewChild('video')
  video: ElementRef;

  quality$ = this.store.pipe(select(qualitySelector));

  form = this.fb.group({ deviceCurrent: null as MediaDeviceInfo });

  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  selectedDevice: string;
  blockUI = false;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.selectedDevice = localStorage.getItem('eventCamera') || localStorage.getItem('qrCamera') || undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible = !!changes?.['visible']?.currentValue;
    const wasVisible = !!changes?.['visible']?.previousValue;
    if (isVisible && !wasVisible) {
      this.startCamera();
    } else if (!isVisible && wasVisible && !!this.video?.nativeElement.srcObject) {
      this.stopCamera();
    }
  }

  async startCamera() {
    try {
      if (!this.hasDevices) {
        await navigator.mediaDevices.getUserMedia({ video: { width: { min: 320, ideal: 9000 }, height: { min: 240, ideal: 6000 } }});
        this.availableDevices = (await navigator.mediaDevices.enumerateDevices())?.filter(device => device.kind === 'videoinput').map(device => ({
          deviceId: device.deviceId,
          groupId: device.groupId,
          kind: device.kind,
          label: device.label
        }) as MediaDeviceInfo);
        this.hasDevices = !!this.availableDevices?.length;
      }
      if (this.hasDevices) {
        try {
          this.stopCamera();
          this.video.nativeElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedDevice }});
          this.selectedDevice = (this.video.nativeElement.srcObject as MediaStream).getVideoTracks().find(track => track.kind === 'video').getSettings().deviceId;
          if (this.form.value.deviceCurrent?.deviceId !== this.selectedDevice) {
            this.form.patchValue({
              deviceCurrent: this.availableDevices?.find(x => x.deviceId === this.selectedDevice)
            });
          }
        } catch {
          this.store.dispatch(toastError({
            summary: $localize`:Camera error headline@@PhotoRecordDialogComponent\:cameraErrorHeadline:'Camera error`,
            detail: $localize`:Camera error details@@PhotoRecordDialogComponent\:cameraErrorDetails:Can not access camera.`
          }));
        }
      }
    } catch {
      this.blockUI = true;
      this.store.dispatch(toastError(mediaDevicesError));
    }
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    localStorage.setItem('eventCamera', this.selectedDevice);
    this.startCamera();
  }

  submit(quality: number) {
    const streamSettings = (this.video.nativeElement.srcObject as MediaStream).getVideoTracks().find(track => track.kind === 'video').getSettings()
    const canvasElement = document.createElement('canvas');
    canvasElement.width = streamSettings.width;
    canvasElement.height = streamSettings.height;
    canvasElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, streamSettings.width, streamSettings.height);
    this.store.dispatch(createRecord({
      eventTemplate: this.photoEventTemplate,
      logId: this.logId,
      date: new Date(),
      data: canvasElement.toDataURL('image/jpeg', quality / 10)
    }));
    this.close();
  }

  stopCamera() {
    if (this.video?.nativeElement) {
      (this.video.nativeElement.srcObject as MediaStream)?.getVideoTracks().forEach(track =>  track.readyState == 'live' && track.kind === 'video' && track.stop());
      this.video.nativeElement.srcObject = null;
    }
  }

  override close(): void {
    this.stopCamera();
    super.close();
  }

}
