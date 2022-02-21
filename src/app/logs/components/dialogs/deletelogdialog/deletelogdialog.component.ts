import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppValidators } from '../../../../shared/utils/validators';
import { Log } from '../../../../shared/models';
import { deleteLog } from '../../../store/log.actions';
import { logSelector } from '../../../store/log.selectors';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'el-delete-log-dialog',
  templateUrl: './deletelogdialog.component.html',
  styleUrls: ['./deletelogdialog.component.scss']
})
export class DeleteLogDialogComponent {

  @Input()
  visible: boolean;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  log$ = this.store.pipe(select(logSelector), filter(log => !!log));

  form = this.fb.group({ title: [null, null, AppValidators.isEqualString(this.log$.pipe(map(log => log.title)))] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }
  
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.form.reset();
  }

  delete(log: Log) {
    this.store.dispatch(deleteLog({ log }));
    this.close();
  }

}
