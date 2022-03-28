import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { revokeRecord } from '../../../store/record.actions';
import { Template, Record, EventType } from '../../../models';

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

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'date', header: 'Absolute Time', styleClass: 'text-center' }
  ];

  constructor(private store: Store) { }

  revokeRecord() {
    if (!!this.records?.length) {
      this.store.dispatch(revokeRecord({ logId: this.records[0].logId}))
    }
  }
}
