import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { EventLabelPipe, EventLabelWithIconPipe } from './pipes/event.pipe';
import { FieldsetModule } from 'primeng/fieldset';

const pipes = [
  EventLabelPipe,
  EventLabelWithIconPipe
]

const modules = [
  ReactiveFormsModule,
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
  FieldsetModule
]

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [ ...modules ],
  exports: [ ...modules, ...pipes ],
  providers: [ ...pipes ]
})
export class UiModule { }
