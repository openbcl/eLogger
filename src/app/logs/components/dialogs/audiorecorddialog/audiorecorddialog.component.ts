import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';
import { logIdSelector } from '../../../../store/router.selector';
import { EventTemplate } from '../../../../models';

@Component({
  selector: 'el-audio-record-dialog',
  templateUrl: './audiorecorddialog.component.html',
  styleUrls: ['./audiorecorddialog.component.scss']
})
export class AudioRecordDialogComponent extends BaseDialogComponent implements OnInit {

  @Input()
  audioEventTemplate: EventTemplate;

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
    this.selectedDevice = localStorage.getItem('eventMic') || undefined;
  }

}
