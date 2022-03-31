import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { EventTemplate } from '../../../../models';
import { toastError } from '../../../../store/toast.actions';

@Component({
  selector: 'el-audio-record-dialog',
  templateUrl: './audiorecorddialog.component.html',
  styleUrls: ['./audiorecorddialog.component.scss']
})
export class AudioRecordDialogComponent extends BaseDialogComponent implements OnInit, OnChanges {

  @Input()
  audioEventTemplate: EventTemplate;

  @Input()
  logId: string;

  form = this.fb.group({ deviceCurrent: null as MediaDeviceInfo });

  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  selectedDevice: string;

  mediaRecorder: MediaRecorder;
  chunks: any[] = [];

  private stream: MediaStream;
  private timestamp: Date;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedDevice = localStorage.getItem('eventMic') || undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible = !!changes?.['visible']?.currentValue;
    const wasVisible = !!changes?.['visible']?.previousValue;
    if (isVisible && !wasVisible) {
      this.startMic();
    } else if (!isVisible && wasVisible && !!this.stream) {
      this.stopMic();
    }
  }

  async startMic() {
    if (!this.hasDevices) {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      this.availableDevices = (await navigator.mediaDevices.enumerateDevices())?.filter(device => device.kind === 'audioinput').map(device => ({
        deviceId: device.deviceId,
        groupId: device.groupId,
        kind: device.kind,
        label: device.label
      }) as MediaDeviceInfo);
      this.hasDevices = !!this.availableDevices?.length;
    }
    if (this.hasDevices) {
      try {
        !!this.stream && this.stopMic();
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: this.selectedDevice }});
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.onstart = () => this.timestamp = new Date();
        this.mediaRecorder.ondataavailable = (e) => this.recordDataAvailable(e);
        this.mediaRecorder.onstop = (e) => this.recordDataComplete(e);
        this.selectedDevice = this.mediaRecorder.stream.getAudioTracks().find(track => track.kind === 'audio').getSettings().deviceId;
        if (this.form.value.deviceCurrent?.deviceId !== this.selectedDevice) {
          this.form.patchValue({
            deviceCurrent: this.availableDevices?.find(x => x.deviceId === this.selectedDevice)
          });
        }
      } catch {
        this.store.dispatch(toastError({
          summary: 'Microphone error',
          detail: 'Can not access microphone.'
        }));
      }
    }
  }

  recordDataAvailable(event: BlobEvent) {
    /// DEBUG iOS
      console.log('RECORD DATA AVAILABLE');
      console.log(event);
      console.log(event.data);
    ///
    this.chunks.push(event.data);
  }

  recordDataComplete(event: any) {
    const reader = new FileReader;
    reader.onload = async () => {
      this.store.dispatch(createRecord({
        eventTemplate: this.audioEventTemplate,
        logId: this.logId,
        date: this.timestamp,
        data: reader.result as string
      }));
      this.close();
    }
    /// DEBUG iOS
      console.log('RECORD DATA COMPLETE')
      console.log(event);
      console.log(event.currentTarget.mimeType);
      console.log(this.chunks);
      console.log(new Blob(this.chunks, { type: event.currentTarget.mimeType }));
    ///
    reader.readAsDataURL(new Blob(this.chunks, { type: event.currentTarget.mimeType }));
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    localStorage.setItem('eventMic', this.selectedDevice);
    this.startMic();
  }

  stopMic() {
    this.mediaRecorder = null;
    this.stream?.getAudioTracks().forEach((track => track.stop()));
    this.chunks = [];
    this.stream = null;
  }

  override close(): void {
    this.stopMic();
    super.close();
  }

}
