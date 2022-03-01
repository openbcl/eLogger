import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExportService } from '../../shared/services/export.service';
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

  constructor(private exportService: ExportService) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  download() {
    this.exportService.exportLogTemplates(this.logTemplates)
  }

}
