import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { sha1 } from 'object-hash'
import { toJSON } from '../../shared/utils/helper';

@Component({
  selector: 'el-qrcode-dialog',
  templateUrl: './qrcodedialog.component.html',
  styleUrls: ['./qrcodedialog.component.scss']
})
export class QRcodeDialogComponent implements OnChanges {

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

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

  constructor(private date: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['data']?.currentValue) {
      this.qrdata = toJSON(changes['data'].currentValue, this.type, true, false);
    }
  }

  download() {
    const hash = sha1(toJSON(this.data, this.type, true, true)).substring(0,6);
    const element = window.document.createElement('a');
    element.href = this.qrcode.qrcElement.nativeElement.firstChild.currentSrc;
    element.download = `${this.filename}_${hash}_${this.date.transform(new Date(), 'yyyy-MM-dd')}.png`;
    element.click();
    window.URL.revokeObjectURL(element.href);
    element.remove();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
