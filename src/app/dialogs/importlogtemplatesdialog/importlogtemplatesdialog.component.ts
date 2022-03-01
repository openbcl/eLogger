import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'el-import-logtemplates-dialog',
  templateUrl: './importlogtemplatesdialog.component.html',
  styleUrls: ['./importlogtemplatesdialog.component.scss']
})
export class ImportLogTemplatesDialogComponent {

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
