import { Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteLogTemplate } from '../../../store/logtemplate.actions';
import { logTemplateSelector } from '../../../store/logtemplate.selectors';
import { LogTemplate } from '../../../../shared/models';

@Component({
  selector: 'el-delete-logtemplate-dialog',
  templateUrl: './deletelogtemplatedialog.component.html',
  styleUrls: ['./deletelogtemplatedialog.component.scss']
})
export class DeleteLogTemplateDialogComponent {

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  logTemplate$ = this.store.pipe(select(logTemplateSelector));

  constructor(
    private store: Store
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  delete(logTemplate: LogTemplate) {
    this.store.dispatch(deleteLogTemplate({ logTemplate }));
    this.close();
  }

}
