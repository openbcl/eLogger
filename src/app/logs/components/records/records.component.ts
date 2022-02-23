import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { recordsProcessingSelector } from '../../../store/record.selectors';
import { LogTemplate, Record } from '../../../shared/models';
import { take } from 'rxjs';

@Component({
  selector: 'el-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {

  @Input()
  records: Record[];

  @Input()
  logTemplate: LogTemplate;

  @Input()
  styleClass: string;

  @Input()
  responsiveLayout = "stack";

  @Input()
  breakpoint = "960px";

  @Input()
  showDataColumn: boolean;

  recordsLoading$ = this.store.pipe(select(recordsProcessingSelector), take(2));

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'date', header: 'Absolute Time', styleClass: 'text-center' }
  ];

  constructor(private store: Store) { }

}
