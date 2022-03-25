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

  form = this.fb.group({ data: [null, Validators.required] });

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
    this.selectedDevice = localStorage.getItem('camera') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible = !!changes?.['visible']?.currentValue;
    const wasInvisible = !changes?.['visible']?.previousValue;
    if (isVisible && wasInvisible) {
      this.setupDevices();
    } else if (!isVisible && !wasInvisible && !!this.video?.nativeElement.srcObject) {
      this.video.nativeElement.srcObject.getTracks().forEach((track: any) =>  track.readyState == 'live' && track.kind === 'video' && track.stop());
      this.video.nativeElement.srcObject = null;
    }
  }

  async setupDevices() {
    if (!this.availableDevices?.length) {
      this.availableDevices = (await navigator.mediaDevices.enumerateDevices())?.filter(device => device.kind === 'videoinput');
      this.hasDevices = !!this.availableDevices?.length;
    }
    if (this.hasDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {
          deviceId: this.selectedDevice || undefined
        } });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        }
      } catch (err) {
        this.cameraIsBlocked = true;
      }
    }
  }

  submit(logId: string) {
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  override close() {
    super.close();
    this.form.reset();
  }

}
