import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { titleCol, descCol, revisionCol } from '../../../utils/lib';
import { templatesProcessingSelector, templatesSelector } from '../../../store/template.selectors';

@Component({
  selector: 'el-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {

  searchTerm = '';
  displayCreateTemplateDialog = false;

  templates$ = this.store.pipe(select(templatesSelector), map(templates => [ ...templates ]));
  templatesLoading$ = this.store.pipe(select(templatesProcessingSelector));

  cols: any[] = [titleCol, descCol, revisionCol];

  constructor(private store: Store) { }

}
