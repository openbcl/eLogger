import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs';
import { logSelector } from '../../../store/log.selectors';
import { logsSelector } from '../../../../store/log.selectors';
import { AppValidators, abstractLogIsUniqueError } from '../../../../utils/validators';
import { Log } from '../../../../models';
import { updateLog } from '../../../store/log.actions';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';

@Component({
  selector: 'el-update-log-dialog',
  templateUrl: './updatelogdialog.component.html',
  styleUrls: ['./updatelogdialog.component.scss']
})
export class UpdateLogDialogComponent extends BaseDialogComponent {

  abstractLogIsUniqueError = abstractLogIsUniqueError;

  form = this.fb.group({
    title: [null, Validators.required],
    desc: null
  }, {
    asyncValidators: AppValidators.abstractLogIsUnique(
      this.store.pipe(select(logsSelector)),
      this.store.pipe(select(logSelector))
    )
  });
  
  log$ = this.store.pipe(select(logSelector), filter(log => !!log), tap(log => {
    this.form.patchValue({
      title: log.title,
      desc: log.desc
    });
  }));

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }

  override close() {
    super.close();
    this.log$.pipe(take(1)).subscribe();
  }

  submit(log: Log) {
    this.store.dispatch(updateLog({
      log: {
        ...log,
        ...this.form.value
      }
    }));
    this.close();
  }

}
