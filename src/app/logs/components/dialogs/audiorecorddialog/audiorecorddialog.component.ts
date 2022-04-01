import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createRecord } from '../../../../store/record.actions';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { EventTemplate } from '../../../../models';
import { toastError } from '../../../../store/toast.actions';
import { mediaDevicesError } from '../../../../utils/lib';

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

  @ViewChild('oscilloscope')
  canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('oscilloscopeContainer')
  oscilloscopeContainer: ElementRef<HTMLDivElement>;;

  form = this.fb.group({ deviceCurrent: null as MediaDeviceInfo });
  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  selectedDevice: string;
  mediaRecorder: MediaRecorder;
  blockUI = false;

  private chunks: any[] = [];
  private stream: MediaStream;
  private timestamp: Date;
  private audioCtx: AudioContext;
  private canvasCtx: CanvasRenderingContext2D;
  private sourceNode: MediaStreamAudioSourceNode;

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
    try {
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
          this.visualize();
          this.mediaRecorder.onstart = () => this.timestamp = new Date();
          this.mediaRecorder.ondataavailable = (e) => this.chunks.push(e.data);
          this.mediaRecorder.onstop = (e) => this.recordComplete(e);
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
    } catch {
      this.blockUI = true;
      this.store.dispatch(toastError(mediaDevicesError));
    }
  }

  recordComplete(event: any) {
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
    reader.readAsDataURL(new Blob(this.chunks, { type: event.currentTarget.mimeType }));
  }

  deviceChange(event: { value: { deviceId: string }}) {
    this.selectedDevice = event?.value?.deviceId || this.selectedDevice;
    localStorage.setItem('eventMic', this.selectedDevice);
    this.startMic();
  }

  stopMic() {
    this.sourceNode?.disconnect();
    this.mediaRecorder = null;
    this.stream?.getAudioTracks().forEach((track => track.stop()));
    this.chunks = [];
    this.stream = null;
  }

  // inspired by: https://github.com/mdn/web-dictaphone
  visualize() {
    if(!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    if(!this.canvasCtx) {
      this.canvasCtx = this.canvas.nativeElement.getContext("2d");
    }
  
    const analyser = this.audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    this.sourceNode = this.audioCtx.createMediaStreamSource(this.stream)
    this.sourceNode.connect(analyser);
    
    const draw = () => {
      this.canvas.nativeElement.width = this.oscilloscopeContainer.nativeElement.offsetWidth - 2;
      
      requestAnimationFrame(draw);
  
      analyser.getByteTimeDomainData(dataArray);
  
      this.canvasCtx.fillStyle = 'rgb(128, 0, 0)';
      this.canvasCtx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
      this.canvasCtx.beginPath();
  
      const sliceWidth = this.canvas.nativeElement.width * 1.0 / bufferLength;
      let x = 0;
      for(let i = 0; i < bufferLength; i++) {
        const y = dataArray[i] / 128.0 * this.canvas.nativeElement.height / 2;
        if(i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      this.canvasCtx.lineTo(this.canvas.nativeElement.width, this.canvas.nativeElement.height / 2);
      this.canvasCtx.stroke();
    }

    draw();
  }

  override close(): void {
    this.stopMic();
    super.close();
  }

}
