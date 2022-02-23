import { Component, Input } from '@angular/core';
import { LogTemplate, Record } from '../../../shared/models';

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

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'date', header: 'Absolute Time', styleClass: 'text-center' }
  ];

  constructor() { }

}
