import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../shared/models';

@Component({
  selector: 'el-export-logs-dialog',
  templateUrl: './exportlogsdialog.component.html',
  styleUrls: ['./exportlogsdialog.component.scss']
})
export class ExportLogsDialogComponent {

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  logs: Log[];

  constructor() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
