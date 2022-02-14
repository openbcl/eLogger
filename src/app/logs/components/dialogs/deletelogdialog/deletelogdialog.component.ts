import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Log } from '../../../../shared/models';
import { deleteLog } from '../../../store/log.actions';

@Component({
  selector: 'el-delete-log-dialog',
  templateUrl: './deletelogdialog.component.html',
  styleUrls: ['./deletelogdialog.component.scss']
})
export class DeleteLogDialogComponent {

  @Input()
  log: Log;

  @Output()
  logChange = new EventEmitter<Log>();

  constructor(private store: Store) { }

  close() {
    this.log = undefined;
    this.logChange.emit(this.log);
  }

  delete() {
    this.store.dispatch(deleteLog({ log: this.log }));
    this.close();
  }

}
