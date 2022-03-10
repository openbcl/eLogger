import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { updateTemplate } from '../../../store/template.actions';
import { eventTemplatesSelector, templateSelector } from '../../../store/template.selectors';
import { EventTemplate, EventType, Template } from '../../../../shared/models';
import { eventIcons, eventTypes } from '../../../../shared/utils/helper';
import { AppValidators, eventTypeIsUniqueError } from '../../../../shared/utils/validators';
import { EventLabelPipe, EventLabelWithIconPipe } from '../../../../ui/pipes/event.pipe';
import { BaseDialogComponent } from '../../../../shared/components/basedialog.component';

@Component({
  selector: 'el-create-eventtemplate-dialog',
  templateUrl: './createeventtemplatedialog.component.html',
  styleUrls: ['./createeventtemplatedialog.component.scss']
})
export class CreateEventTemplateDialogComponent extends BaseDialogComponent {

  eventTypeIsUniqueError = eventTypeIsUniqueError;
  eventIcons = eventIcons;
  eventTypes = eventTypes;
  colors = [null, 'yellow', 'orange', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green'];

  eventTemplates$ = this.store.pipe(select(eventTemplatesSelector));
  template$ = this.store.pipe(select(templateSelector));
  
  form = this.fb.group({
    selectedTemplate: undefined,
    name: [null, Validators.required],
    eventType: [EventType.DEFAULT, Validators.required],
    icon: eventIcons[0],
    color: null
  }, {
    asyncValidators: AppValidators.eventTypeIsUnique(this.template$)
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private eventLabel: EventLabelPipe,
    private eventLabelWithIcon: EventLabelWithIconPipe
  ) {
    super();
  }

  override close() {
    super.close();
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
          this.form.patchValue({ name: this.eventLabel.transform(this.form.value.eventType) });
      }
    }
  }

  reset() {
    this.form.reset({
      selectedTemplate: undefined,
      name: null,
      eventType: EventType.DEFAULT,
      icon: eventIcons[0],
      color: null
    });
    this.form.enable();
  }

  submit(template: Template) {
    const eventTemplate = this.form.getRawValue();
    delete eventTemplate.selectedTemplate;
    const { value, styleClass } = eventTemplate.eventType !== 0 ? this.eventLabelWithIcon.transform(eventTemplate.eventType) : eventTemplate.icon;
    eventTemplate.icon = { value, styleClass };
    this.store.dispatch(updateTemplate({
      template: {
        ...template,
        eventTemplates: [ ...template.eventTemplates, eventTemplate as EventTemplate ]
      }
    }));
    this.close();
  }

}
