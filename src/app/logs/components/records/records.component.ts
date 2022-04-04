import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { revokeRecord } from '../../../store/record.actions';
import { Template, Record, EventType } from '../../../models';
import { recordsProcessingSelector } from '../../../store/record.selectors';
import { iconCol, nameCol, absTimeCol } from '../../../utils/lib';

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

  processing$ =this.store.pipe(select(recordsProcessingSelector))

  constructor(private store: Store) { }

  revokeRecord() {
    if (!!this.records?.length) {
      this.store.dispatch(revokeRecord({ logId: this.records[0].logId}))
    }
  }
}
