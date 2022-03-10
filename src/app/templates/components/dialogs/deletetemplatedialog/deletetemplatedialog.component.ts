import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteTemplate } from '../../../store/template.actions';
import { templateSelector } from '../../../store/template.selectors';
import { Template } from '../../../../models';
import { BaseDialogComponent } from '../../../../components/basedialog/basedialog.component';

@Component({
  selector: 'el-delete-template-dialog',
  templateUrl: './deletetemplatedialog.component.html',
  styleUrls: ['./deletetemplatedialog.component.scss']
})
export class DeleteTemplateDialogComponent extends BaseDialogComponent {

  template$ = this.store.pipe(select(templateSelector));

  constructor(private store: Store) {
    super();
  }

  delete(template: Template) {
    this.store.dispatch(deleteTemplate({ template }));
    this.close();
  }

}
