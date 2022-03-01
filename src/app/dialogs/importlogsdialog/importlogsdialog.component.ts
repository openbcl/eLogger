import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'el-import-logs-dialog',
  templateUrl: './importlogsdialog.component.html',
  styleUrls: ['./importlogsdialog.component.scss']
})
export class ImportLogsDialogComponent {

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  constructor() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
