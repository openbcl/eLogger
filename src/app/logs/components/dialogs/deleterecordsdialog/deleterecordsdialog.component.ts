import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { logSelector } from '../../../store/log.selectors';
import { AppValidators } from '../../../../shared/utils/validators';
import { deleteRecords } from '../../../../store/record.actions';
import { BasicDialogComponent } from '../../../../shared/components/basicdialog.component';

@Component({
  selector: 'el-delete-records-dialog',
  templateUrl: './deleterecordsdialog.component.html',
  styleUrls: ['./deleterecordsdialog.component.scss']
})
export class DeleteRecordsDialogComponent extends BasicDialogComponent {

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

  delete(logId: string) {
    this.store.dispatch(deleteRecords({ logId }))
    this.close();
  }

}
