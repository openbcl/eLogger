import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
  filename: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['data']?.currentValue) {
      console.log(changes['data'].currentValue);
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
