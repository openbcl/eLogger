import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppValidators } from '../../../utils/validators';
import { BaseDialogComponent } from '../../../components/basedialog/basedialog.component';
import { resetDB } from '../../../store/setting.actions';

@Component({
  selector: 'el-reset-db-dialog',
  templateUrl: './resetdbdialog.component.html',
  styleUrls: ['./resetdbdialog.component.scss']
})
export class ResetDbDialogComponent extends BaseDialogComponent {

  deleteCommand = 'Reset App Data'

  form = this.fb.group({ deleteCommand: [null, null, AppValidators.isEqualString(of(this.deleteCommand))] });

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

  resetDB() {
    this.store.dispatch(resetDB())
    this.close();
  }

}
