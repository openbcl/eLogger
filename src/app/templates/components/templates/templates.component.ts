import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
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

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'desc', header: 'Description' },
    { field: 'revision', header: 'Created/Modified' }
  ];

  constructor(private store: Store) { }

}
