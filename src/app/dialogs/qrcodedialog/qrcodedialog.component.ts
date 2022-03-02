import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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

  qrCode: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['data']?.currentValue) {
      this.qrCode = toJSON(changes['data'].currentValue, this.type, true, false);
    }
  }

  download() {
    // TODO
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
