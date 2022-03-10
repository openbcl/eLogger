import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { toJSON } from '../../../utils/lib';
import { BaseDialogComponent } from '../../basedialog/basedialog.component';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'el-qrcode-dialog',
  templateUrl: './qrcodedialog.component.html',
  styleUrls: ['./qrcodedialog.component.scss']
})
export class QRcodeDialogComponent extends BaseDialogComponent implements OnChanges {

  @Input()
  data: any;

  @Input()
  header: string;

  @Input()
  type: string;

  @Input()
  filename: string;

  @ViewChild('qrcode')
  qrcode: QRCodeComponent;

  qrdata: any;

  constructor(private exportService: ExportService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['data']?.currentValue) {
      this.qrdata = toJSON(changes['data'].currentValue, this.type, true, false);
    }
  }

  download() {
    const element = window.document.createElement('a');
    element.href = this.qrcode.qrcElement.nativeElement.firstChild.currentSrc;
    element.download = this.exportService.uniqueFilename(this.filename, this.data, 'png');
    element.click();
    window.URL.revokeObjectURL(element.href);
    element.remove();
  }

}
