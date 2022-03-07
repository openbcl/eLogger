import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe  } from '@angular/common';
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
import { AccordionModule } from 'primeng/accordion';
import { SkeletonModule } from 'primeng/skeleton';
import { QRCodeModule } from 'angularx-qrcode';
import { FileUploadModule } from 'primeng/fileupload';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EventButtonDisabledPipe, EventLabelPipe, EventLabelWithIconPipe, EventRelTimePipe, CurrentEventRelTimePipe } from './pipes/event.pipe';
import { ColorPipe } from './pipes/color.pipe';
import { LogTemplateTitlePipe, LogTemplateDescPipe, LogEventTemplatesPipe } from './pipes/log.pipe';

const pipes = [
  EventLabelPipe,
  EventLabelWithIconPipe,
  ColorPipe,
  LogTemplateTitlePipe,
  LogTemplateDescPipe,
  EventRelTimePipe,
  CurrentEventRelTimePipe,
  LogEventTemplatesPipe,
  EventButtonDisabledPipe
]

const modules = [
  ReactiveFormsModule,
  ReactiveComponentModule,
  HttpClientModule,
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
  DropdownModule,
  SkeletonModule,
  AccordionModule,
  FileUploadModule,
  QRCodeModule,
  ZXingScannerModule
]

@NgModule({
  declarations: [
    ...pipes,
    ColorPipe
  ],
  imports: [ ...modules ],
  exports: [ ...modules, ...pipes ],
  providers: [ ...pipes, DatePipe ]
})
export class UiModule { }
