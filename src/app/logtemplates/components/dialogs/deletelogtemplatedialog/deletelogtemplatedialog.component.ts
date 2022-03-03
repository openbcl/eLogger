import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteLogTemplate } from '../../../store/logtemplate.actions';
import { logTemplateSelector } from '../../../store/logtemplate.selectors';
import { LogTemplate } from '../../../../shared/models';
import { BasicDialogComponent } from '../../../../shared/components/basicdialog.component';

@Component({
  selector: 'el-delete-logtemplate-dialog',
  templateUrl: './deletelogtemplatedialog.component.html',
  styleUrls: ['./deletelogtemplatedialog.component.scss']
})
export class DeleteLogTemplateDialogComponent extends BasicDialogComponent {

  logTemplate$ = this.store.pipe(select(logTemplateSelector));

  constructor(private store: Store) {
    super();
  }

  delete(logTemplate: LogTemplate) {
    this.store.dispatch(deleteLogTemplate({ logTemplate }));
    this.close();
  }

}
