import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppValidators } from '../../../../shared/utils/validators';
import { Log } from '../../../../shared/models';
import { deleteLog } from '../../../store/log.actions';

@Component({
  selector: 'el-delete-log-dialog',
  templateUrl: './deletelogdialog.component.html',
  styleUrls: ['./deletelogdialog.component.scss']
})
export class DeleteLogDialogComponent implements OnChanges {

  @Input()
  log: Log;

  @Output()
  logChange = new EventEmitter<Log>();

  compare = { value: '' };
  form = this.fb.group({ title: [null, AppValidators.isEqualString(this.compare)] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['log']?.['currentValue']?.title?.length) {
      this.compare.value = this.log.title;
    }
  }
  
  close() {
    this.log = undefined;
    this.logChange.emit(this.log);
    this.form.reset();
  }

  delete() {
    this.store.dispatch(deleteLog({ log: this.log }));
    this.close();
  }

}
