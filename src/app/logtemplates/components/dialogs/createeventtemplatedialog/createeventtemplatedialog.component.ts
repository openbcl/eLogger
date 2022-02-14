import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { updateLogTemplate } from '../../../store/logtemplate.actions';
import { eventTemplatesSelector, logTemplateSelector } from '../../../store/logtemplate.selectors';
import { EventTemplate, EventType, LogTemplate } from '../../../../shared/models';
import { eventIcons, eventTypes } from '../../../../shared/utils/helper';
import { AppValidators, eventTypeIsUniqueError } from '../../../../shared/utils/validators';
import { EventLabelPipe, EventLabelWithIconPipe } from '../../../../ui/pipes/event.pipe';

@Component({
  selector: 'el-create-eventtemplate-dialog',
  templateUrl: './createeventtemplatedialog.component.html',
  styleUrls: ['./createeventtemplatedialog.component.scss']
})
export class CreateEventTemplateDialogComponent {

  eventTypeIsUniqueError = eventTypeIsUniqueError;
  eventIcons = eventIcons;
  eventTypes = eventTypes;
  colors = ['', 'yellow', 'orange', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green'];

  @Input()
  visible: boolean;
  
  @Output()
  visibleChange = new EventEmitter<boolean>();

  eventTemplates$ = this.store.pipe(select(eventTemplatesSelector));
  logTemplate$ = this.store.pipe(select(logTemplateSelector));
  
  form = this.fb.group({
    selectedTemplate: undefined,
    name: ['', Validators.required],
    eventType: [EventType.DEFAULT, Validators.required],
    icon: eventIcons[0],
    color: ''
  }, {
    asyncValidators: AppValidators.eventTypeIsUnique(this.logTemplate$)
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private eventLabelPipePipe: EventLabelPipe,
    private eventLabelWithIconPipePipe: EventLabelWithIconPipe
  ) { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.reset();
  }

  dropdownChanged(event: any ) {
    if (!!event.value) {
      const eventTemplate = {...event.value, icon: eventIcons.find(icon => icon.value ===  event.value.icon.value) };
      delete eventTemplate.selectedTemplate;
      this.form.patchValue(eventTemplate);
      Object.keys(eventTemplate).forEach(key => this.form.controls[key].disable())
    }
  }

  setName() {
    if (this.form.value.eventType !== undefined) {
      switch(this.form.value.eventType) {
        case EventType.DEFAULT:
          this.form.patchValue({ name: ''});
          break;
        default:
          this.form.patchValue({ name: this.eventLabelPipePipe.transform(this.form.value.eventType) });
      }
    }
  }

  reset() {
    this.form.reset({
      selectedTemplate: undefined,
      name: '',
      eventType: EventType.DEFAULT,
      icon: eventIcons[0],
      color: ''
    });
    this.form.enable();
  }

  submit(logTemplate: LogTemplate) {
    const eventTemplate: EventTemplate = this.form.getRawValue();
    const { value, styleClass } = eventTemplate.eventType !== 0 ? this.eventLabelWithIconPipePipe.transform(eventTemplate.eventType) : eventTemplate.icon;
    eventTemplate.icon = { value, styleClass };
    this.store.dispatch(updateLogTemplate({
      logTemplate: {
        ...logTemplate,
        eventTemplates: [ ...logTemplate.eventTemplates, eventTemplate ]
      }
    }));
    this.close();
  }

}
