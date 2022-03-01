import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogTemplate } from '../../shared/models';

@Component({
  selector: 'el-export-logtemplates-dialog',
  templateUrl: './exportlogtemplatesdialog.component.html',
  styleUrls: ['./exportlogtemplatesdialog.component.scss']
})
export class ExportLogTemplatesDialogComponent {

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  logTemplates: LogTemplate[];

  constructor() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
