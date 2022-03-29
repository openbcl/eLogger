import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { EventTemplate } from '../../../../models';
import { logIdSelector } from '../../../../store/router.selector';
import { filter } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { createRecord } from '../../../../store/record.actions';
import { toastError } from '../../../../store/toast.actions';

@Component({
  selector: 'el-picture-record-dialog',
  templateUrl: './picturerecorddialog.component.html',
  styleUrls: ['./picturerecorddialog.component.scss']
})
export class PictureRecordDialogComponent extends BaseDialogComponent implements OnInit, OnChanges {

  @Input()
  pictureEventTemplate: EventTemplate;

  @ViewChild('video')
  video: ElementRef;

  logId$ = this.store.pipe(select(logIdSelector), filter(logId => !!logId));

  form = this.fb.group({ deviceCurrent: null as MediaDeviceInfo });

  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  selectedDevice: string;

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
    if (!this.hasDevices) {
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
        this.video.nativeElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: {
          deviceId: this.selectedDevice,
          width: { min: 240 }
        }});
        this.selectedDevice = (this.video.nativeElement.srcObject as MediaStream).getVideoTracks().find(track => track.kind === 'video').getSettings().deviceId;
        if (this.form.value.deviceCurrent?.deviceId !== this.selectedDevice) {
          this.form.patchValue({
            deviceCurrent: this.availableDevices?.find(x => x.deviceId === this.selectedDevice)
          });        }
      } catch {
        this.store.dispatch(toastError({
          summary: 'Camera error',
          detail: 'Can not access camera.'
        }));
      }
    }
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    localStorage.setItem('eventCamera', this.selectedDevice);
    this.startCamera();
  }

  submit(logId: string) {
    const streamSettings = (this.video.nativeElement.srcObject as MediaStream).getVideoTracks().find(track => track.kind === 'video').getSettings()
    const canvasElement = document.createElement('canvas');
    canvasElement.width = streamSettings.width;
    canvasElement.height = streamSettings.height;
    canvasElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
    this.store.dispatch(createRecord({
      eventTemplate: this.pictureEventTemplate,
      logId,
      date: new Date(),
      data: canvasElement.toDataURL('image/jpeg', 0.5)
    }));
    this.close();
  }

  stopCamera() {
    this.video?.nativeElement?.srcObject?.getVideoTracks().forEach((track: any) =>  track.readyState == 'live' && track.kind === 'video' && track.stop());
    this.video.nativeElement.srcObject = null;
  }

  override close(): void {
    this.stopCamera();
    super.close();
  }

}
