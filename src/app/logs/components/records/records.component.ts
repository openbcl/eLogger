import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { revokeRecord } from '../../../store/record.actions';
import { Template, Record, EventType } from '../../../models';
import { recordsProcessingSelector } from '../../../store/record.selectors';
import { iconCol, nameCol, absTimeCol } from '../../../utils/lib';
import { RecordService } from '../../../services/record.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'el-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {

  EventType = EventType;

  @Input()
  records: Record[];

  @Input()
  template: Template;

  @Input()
  styleClass: string;

  @Input()
  responsiveLayout = "stack";

  @Input()
  breakpoint = "960px";

  @Input()
  showDataColumn: boolean;

  @Input()
  showRevokeButton = false;

  cols: any[] = [iconCol, nameCol, absTimeCol];

  processingRevoke$ =this.store.pipe(select(recordsProcessingSelector))

  mediaData: { [key: number]: Observable<string> } = {}

  constructor(
    private store: Store,
    private recordService: RecordService
  ) { }

  revokeRecord() {
    if (!!this.records?.length) {
      this.store.dispatch(revokeRecord({ logId: this.records[0].logId}))
    }
  }

  loadRecordData(key: number) {
    if (!this.mediaData[key]) {
      this.mediaData[key] = this.recordService.loadRecordData(key);
    }
    return this.mediaData[key];
  }
}
