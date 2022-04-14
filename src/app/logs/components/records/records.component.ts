import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { revokeRecord } from '../../../store/record.actions';
import { Template, Record, EventType } from '../../../models';
import { recordsProcessingSelector } from '../../../store/record.selectors';
import { iconCol, nameCol, absTimeCol } from '../../../utils/lib';
import { RecordService } from '../../../services/record.service';
import { Observable } from 'rxjs';

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
  responsiveLayout = 'stack';

  @Input()
  breakpoint = '960px';

  @Input()
  showDataColumn: boolean;

  @Input()
  showRevokeButton = false;

  cols: any[] = [
    { header: $localize`:Event column@@RecordsComponent\:eventColumn:Event` },
    { header: $localize`:Data column@@RecordsComponent\:dataColumn:Data` },
    { header: $localize`:Absolute time column@@RecordsComponent\:absoluteTimeColumn:Absolute Time` },
    { header: $localize`:Time difference column@@RecordsComponent\:timeDifferenceCol:Time Difference` },
    { header: $localize`:Relative time column@@RecordsComponent\:relativeTimeColumn:Relative Time` }
  ];

  processingRevoke$ =this.store.pipe(select(recordsProcessingSelector))

  mediaData: { [key: number]: Observable<string> } = {}

  constructor(
    private store: Store,
    private recordService: RecordService
  ) { }

  hasData(records: Record[]) {
    return !!records?.find(value => !!value.data?.length);
  }

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
