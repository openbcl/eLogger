import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { EventTemplate } from '../../../../models';
import { logIdSelector } from '../../../../store/router.selector';
import { filter } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';

@Component({
  selector: 'el-picture-record-dialog',
  templateUrl: './picturerecorddialog.component.html',
  styleUrls: ['./picturerecorddialog.component.scss']
})
export class PictureRecordDialogComponent extends BaseDialogComponent implements OnInit, OnChanges {

  @Input()
  pictureEventTemplate: EventTemplate;

  logId$ = this.store.pipe(select(logIdSelector), filter(logId => !!logId));

  form = this.fb.group({
    data: [null, Validators.required],
    deviceCurrent: null as MediaDeviceInfo
  });

  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  captures: string[] = [];

  availableDevices: MediaDeviceInfo[];
  hasDevices = false;
  selectedDevice: string;
  cameraIsBlocked = false;

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
      this.setupDevices();
    } else if (!isVisible && wasVisible && !!this.video?.nativeElement.srcObject) {
      this.stopCamera();
    }
  }

  async setupDevices() {
    if (!this.hasDevices) {
      this.availableDevices = (await navigator.mediaDevices.enumerateDevices())?.filter(device => device.kind === 'videoinput');
      this.hasDevices = !!this.availableDevices?.length;
    }
    if (this.hasDevices) {
      try {
        this.stopCamera();
        this.video.nativeElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedDevice } });
        this.selectedDevice = (this.video.nativeElement.srcObject as MediaStream).getVideoTracks().find(track => track.kind === 'video').getSettings().deviceId;
        if (this.form.value.deviceCurrent?.deviceId !== this.selectedDevice) {
          this.form.patchValue({
            deviceCurrent: this.availableDevices?.find(x => x.deviceId === this.selectedDevice)
          });
        }
        this.video.nativeElement.play();
      } catch (err) {
        this.cameraIsBlocked = true;
      }
    }
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    localStorage.setItem('eventCamera', this.selectedDevice);
    this.setupDevices();
  }

  submit(logId: string) {
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  stopCamera() {
    this.video?.nativeElement?.srcObject?.getVideoTracks().forEach((track: any) =>  track.readyState == 'live' && track.kind === 'video' && track.stop());
    this.video.nativeElement.srcObject = null;
  }

}
