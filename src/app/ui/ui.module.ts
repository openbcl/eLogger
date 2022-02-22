import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset'; 
import { DropdownModule } from 'primeng/dropdown';
import { EventLabelPipe, EventLabelWithIconPipe, EventRelTimePipe } from './pipes/event.pipe';
import { ColorPipe } from './pipes/color.pipe';
import { LogTemplateTitlePipe, LogTemplateDescPipe, LogEventTemplates } from './pipes/log.pipe';

const pipes = [
  EventLabelPipe,
  EventLabelWithIconPipe,
  ColorPipe,
  LogTemplateTitlePipe,
  LogTemplateDescPipe,
  EventRelTimePipe,
  LogEventTemplates
]

const modules = [
  ReactiveFormsModule,
  ReactiveComponentModule,
  RippleModule,
  TabViewModule,
  MenubarModule,
  TableModule,
  InputTextModule,
  ButtonModule,
  PanelModule,
  ScrollPanelModule,
  DialogModule,
  SelectButtonModule,
  FieldsetModule,
  DropdownModule
]

@NgModule({
  declarations: [
    ...pipes,
    ColorPipe
  ],
  imports: [ ...modules ],
  exports: [ ...modules, ...pipes ],
  providers: [ ...pipes ]
})
export class UiModule { }
