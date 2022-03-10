import { Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateTemplate } from '../../../store/template.actions';
import { EventTemplate, Template } from '../../../../shared/models';
import { deepCompareEventTemplates } from '../../../../shared/utils/helper';
import { templateSelector } from '../../../store/template.selectors';

@Component({
  selector: 'el-delete-eventtemplate-dialog',
  templateUrl: './deleteeventtemplatedialog.component.html',
  styleUrls: ['./deleteeventtemplatedialog.component.scss']
})
export class DeleteEventTemplateDialogComponent {

  @Input()
  eventTemplate: EventTemplate;

  @Output()
  eventTemplateChange = new EventEmitter<EventTemplate>();

  template$ = this.store.pipe(select(templateSelector));

  constructor(private store: Store) { }

  close() {
    this.eventTemplate = undefined;
    this.eventTemplateChange.emit(this.eventTemplate);
  }

  delete(template: Template) {
    this.store.dispatch(updateTemplate({
      template: {
        ...template,
        eventTemplates: template.eventTemplates.filter(eventTemplate => !deepCompareEventTemplates(eventTemplate, this.eventTemplate))
      }
    }));
    this.close();
  }

}
