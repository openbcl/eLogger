import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppValidators } from '../../../../utils/validators';
import { Log } from '../../../../models';
import { deleteLog } from '../../../store/log.actions';
import { logSelector } from '../../../store/log.selectors';
import { filter, map } from 'rxjs';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';

@Component({
  selector: 'el-delete-log-dialog',
  templateUrl: './deletelogdialog.component.html',
  styleUrls: ['./deletelogdialog.component.scss']
})
export class DeleteLogDialogComponent extends BaseDialogComponent {

  log$ = this.store.pipe(select(logSelector), filter(log => !!log));

  form = this.fb.group({ title: [null, null, AppValidators.isEqualString(this.log$.pipe(map(log => log.title)))] });

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }
  
  override close() {
    super.close();
    this.form.reset();
  }

  delete(log: Log) {
    this.store.dispatch(deleteLog({ log }));
    this.close();
  }

}
