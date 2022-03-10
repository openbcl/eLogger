import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TemplateEffects } from './store/template.effects';
import { UiModule } from '../ui/ui.module';
import { TemplatesComponent } from './components/templates/templates.component';
import { TemplateComponent } from './components/template/template.component';
import { UpdateTemplateDialogComponent } from './components/dialogs/updatetemplatedialog/updatetemplatedialog.component';
import { DeleteTemplateDialogComponent } from './components/dialogs/deletetemplatedialog/deletetemplatedialog.component';
import { CreateEventTemplateDialogComponent } from './components/dialogs/createeventtemplatedialog/createeventtemplatedialog.component';
import { CreateTemplateDialogComponent } from './components/dialogs/createtemplatedialog/createtemplatedialog.component';
import { DeleteEventTemplateDialogComponent } from './components/dialogs/deleteeventtemplatedialog/deleteeventtemplatedialog.component';
import * as fromTemplate from './store/template.reducer';


@NgModule({
  declarations: [
    TemplatesComponent,
    TemplateComponent,
    UpdateTemplateDialogComponent,
    DeleteTemplateDialogComponent,
    CreateEventTemplateDialogComponent,
    CreateTemplateDialogComponent,
    DeleteEventTemplateDialogComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    UiModule,
    StoreModule.forFeature(fromTemplate.templateFeatureKey, fromTemplate.templateReducer),
    EffectsModule.forFeature([TemplateEffects])
  ]
})
export class TemplatesModule { }
