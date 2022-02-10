import { Component, EventEmitter, Input, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { updateLogTemplate } from '../../../store/logtemplate.actions';
import { EventTemplate, LogTemplate } from '../../../../shared/models';
import { deepCompareEventTemplates } from '../../../../shared/utils/helper';
import { logTemplateSelector } from '../../../store/logtemplate.selectors';

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

  logTemplate$ = this.store.pipe(select(logTemplateSelector));

  constructor(private store: Store) { }

  close() {
    this.eventTemplate = undefined;
    this.eventTemplateChange.emit(this.eventTemplate);
  }

  delete(logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates: logTemplate.eventTemplates.filter(eventTemplate => !deepCompareEventTemplates(eventTemplate, this.eventTemplate))
      }
    }));
    this.close();
  }

}
