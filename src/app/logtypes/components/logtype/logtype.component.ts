import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { EventTemplate, EventType, LogType } from '../../../shared/models';
import { loadLogType, updateLogType } from '../../store/logtype.actions';
import { logTypeProcessingSelector, logTypeSelector } from '../../store/logtype.selectors';
import { eventIcons, eventTypes } from '../../../shared/utils/helper';
import { EventLabelWithIconPipe, EventLabelPipe } from '../../../ui/pipes/event.pipe';

@Component({
  selector: 'el-logtype',
  templateUrl: './logtype.component.html',
  styleUrls: ['./logtype.component.scss']
})
export class LogTypeComponent implements OnInit {

  eventIcons = eventIcons;
  eventTypes = eventTypes;
  searchTerm = '';
  displayNewEventTemplateDialog = false;
  displayUpdateLogTypeDialog = false;

  logType$ = this.store.pipe(select(logTypeSelector), filter(logType => !!logType), map(logType => ({ ...logType, eventTemplates: [ ...logType.eventTemplates ] })));
  logTypeLoading$ = this.store.pipe(select(logTypeProcessingSelector));

  updateLogTypeForm = this.fb.group({
    title: ['', Validators.required],
    desc: ''
  });

  createEventTemplateForm = this.fb.group({
    name: ['', Validators.required],
    eventType: [EventType.DEFAULT, Validators.required],
    icon: eventIcons[0]
  });

  cols: any[] = [
    { field: 'icon', header: 'Icon' },
    { field: 'name', header: 'Name' },
    { field: 'eventType', header: 'Type' }
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private eventLabelPipePipe: EventLabelPipe,
    private eventLabelWithIconPipePipe: EventLabelWithIconPipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogType({ id: this.route.snapshot.paramMap.get('id') }));
  }

  updateLogType(logType: LogType) {
    this.updateLogTypeForm.setValue({
      title: logType.title,
      desc: logType.desc
    });
    this.displayUpdateLogTypeDialog = true;
  }

  setEventTemplateName() {
    switch(this.createEventTemplateForm.value.eventType) {
      case EventType.DEFAULT:
        this.createEventTemplateForm.patchValue({ name: ''});
        break;
      default:
        this.createEventTemplateForm.patchValue({ name: this.eventLabelPipePipe.transform(this.createEventTemplateForm.value.eventType) });
    }
  }

  submitLogType(logType: LogType) {
    this.store.dispatch(updateLogType({
      logType: {
        ...logType,
        ...this.updateLogTypeForm.value
      }
    }));
    this.displayUpdateLogTypeDialog = false;
    this.updateLogTypeForm.reset();
  }

  submitEventTemplate(logType: LogType) {
    const eventTemplate: EventTemplate = this.createEventTemplateForm.value;
    const { value, styleClass } = eventTemplate.eventType !== 0 ? this.eventLabelWithIconPipePipe.transform(eventTemplate.eventType) : eventTemplate.icon;
    eventTemplate.icon = { value, styleClass };
    this.store.dispatch(updateLogType({
      logType: {
        ...logType,
        eventTemplates: [ ...logType.eventTemplates, eventTemplate ]
      }
    }));
    this.displayNewEventTemplateDialog = false;
    this.createEventTemplateForm.reset({
      name: '',
      eventType: EventType.DEFAULT,
      icon: eventIcons[0]
    });
  }
}
