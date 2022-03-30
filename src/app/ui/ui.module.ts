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
import { ImageModule } from 'primeng/image';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BlockUIModule } from 'primeng/blockui';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EventButtonDisabledPipe, EventLabelPipe, EventLabelWithIconPipe, EventRelTimePipe, CurrentEventRelTimePipe } from './pipes/event.pipe';
import { ColorPipe } from './pipes/color.pipe';
import { TemplateTitlePipe, TemplateDescPipe, LogEventTemplatesPipe, TemplateExistsPipe } from './pipes/log.pipe';

const pipes = [
  EventLabelPipe,
  EventLabelWithIconPipe,
  ColorPipe,
  TemplateTitlePipe,
  TemplateDescPipe,
  EventRelTimePipe,
  CurrentEventRelTimePipe,
  LogEventTemplatesPipe,
  EventButtonDisabledPipe,
  TemplateExistsPipe
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
  ImageModule,
  DialogModule,
  SelectButtonModule,
  FieldsetModule,
  DropdownModule,
  BlockUIModule,
  AccordionModule,
  ProgressSpinnerModule,
  InputSwitchModule,
  FileUploadModule,
  SliderModule,
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
