import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { EventTemplate, EventType, LogTemplate } from '../../../shared/models';
import { deleteLogTemplate, loadLogTemplate, loadLogTemplates, updateLogTemplate } from '../../store/logtemplate.actions';
import { eventTemplatesSelector, logTemplateProcessingSelector, logTemplateSelector } from '../../store/logtemplate.selectors';
import { eventIcons, eventTypes } from '../../../shared/utils/helper';
import { EventLabelWithIconPipe, EventLabelPipe } from '../../../ui/pipes/event.pipe';

@Component({
  selector: 'el-logtemplate',
  templateUrl: './logtemplate.component.html',
  styleUrls: ['./logtemplate.component.scss']
})
export class LogTemplateComponent implements OnInit {

  eventIcons = eventIcons;
  eventTypes = eventTypes;
  searchTerm = '';
  displayNewEventTemplateDialog = false;
  displayUpdateLogTemplateDialog = false;
  displayDeleteLogTemplateDialog = false;
  
  logTemplate$ = this.store.pipe(select(logTemplateSelector), filter(logTemplate => !!logTemplate), map(logTemplate => ({ ...logTemplate, eventTemplates: [ ...logTemplate.eventTemplates ] })));
  logTemplateLoading$ = this.store.pipe(select(logTemplateProcessingSelector));
  eventTemplates$ = this.store.pipe(select(eventTemplatesSelector));
  
  updateLogTemplateForm = this.fb.group({
    title: ['', Validators.required],
    desc: ''
  });
  
  createEventTemplateForm = this.fb.group({
    selectedTemplate: undefined,
    name: ['', Validators.required],
    eventType: [EventType.DEFAULT, Validators.required],
    icon: eventIcons[0],
    color: ''
  });
  
  colors = ['', 'yellow', 'orange', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green'];
  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'eventType', header: 'Type' },
    { field: 'icon', header: 'Icon' }
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private eventLabelPipePipe: EventLabelPipe,
    private eventLabelWithIconPipePipe: EventLabelWithIconPipe,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLogTemplates());
    this.store.dispatch(loadLogTemplate({ id: this.activeRoute.snapshot.paramMap.get('id') }));
  }

  showNewEventTemplateDialog() {
    this.resetCreateEventTemplateForm();
    this.displayNewEventTemplateDialog = true;
  }

  updateLogTemplate(logTemplate: LogTemplate) {
    this.updateLogTemplateForm.setValue({
      title: logTemplate.title,
      desc: logTemplate.desc
    });
    this.displayUpdateLogTemplateDialog = true;
  }

  onRowReorder(eventTemplates: EventTemplate[], logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates
      }
    }));
  }

  eventTemplateChanged(event: any ) {
    const eventTemplate = { ...event.value, icon: eventIcons.find(icon => icon.value ===  event.value.icon.value) }
    delete eventTemplate.selectedTemplate;
    this.createEventTemplateForm.patchValue(eventTemplate);
    Object.keys(eventTemplate).forEach(key => this.createEventTemplateForm.controls[key].disable())
  }

  eventTemplateCleared() {
    this.resetCreateEventTemplateForm();
  }

  setEventTemplateName() {
    if (this.createEventTemplateForm.value.eventType !== undefined) {
      switch(this.createEventTemplateForm.value.eventType) {
        case EventType.DEFAULT:
          this.createEventTemplateForm.patchValue({ name: ''});
          break;
        default:
          this.createEventTemplateForm.patchValue({ name: this.eventLabelPipePipe.transform(this.createEventTemplateForm.value.eventType) });
      }
    }
  }

  submitLogTemplate(logTemplate: LogTemplate) {
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        ...this.updateLogTemplateForm.value
      }
    }));
    this.displayUpdateLogTemplateDialog = false;
    this.updateLogTemplateForm.reset();
  }

  submitEventTemplate(logTemplate: LogTemplate) {
    const eventTemplate: EventTemplate = this.createEventTemplateForm.getRawValue();
    const { value, styleClass } = eventTemplate.eventType !== 0 ? this.eventLabelWithIconPipePipe.transform(eventTemplate.eventType) : eventTemplate.icon;
    eventTemplate.icon = { value, styleClass };
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates: [ ...logTemplate.eventTemplates, eventTemplate ]
      }
    }));
    this.displayNewEventTemplateDialog = false;
    this.resetCreateEventTemplateForm();
  }

  resetCreateEventTemplateForm() {
    this.createEventTemplateForm.reset({
      selectedTemplate: undefined,
      name: '',
      eventType: EventType.DEFAULT,
      icon: eventIcons[0],
      color: ''
    });
    this.createEventTemplateForm.enable();
  }

  deleteLogTemplate(logTemplate: LogTemplate) {
    this.store.dispatch(deleteLogTemplate({ logTemplate }));
    this.displayDeleteLogTemplateDialog = false;
  }
}
