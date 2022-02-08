import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogTemplatesRoutingModule } from './logtemplates-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LogTemplateEffects } from './store/logtemplate.effects';
import * as fromLogTemplate from './store/logtemplate.reducer';
import { UiModule } from '../ui/ui.module';
import { LogTemplatesComponent } from './components/logtemplates/logtemplates.component';
import { LogTemplateComponent } from './components/logtemplate/logtemplate.component';
import { UpdateLogTemplateDialogComponent } from './components/dialogs/updatelogtemplatedialog/updatelogtemplatedialog.component';
import { DeleteLogTemplateDialogComponent } from './components/dialogs/deletelogtemplatedialog/deletelogtemplatedialog.component';
import { CreateEventTemplateDialogComponent } from './components/dialogs/createeventtemplatedialog/createeventtemplatedialog.component';
import { CreateLogTemplateDialogComponent } from './components/dialogs/createlogtemplatedialog/createlogtemplatedialog.component';


@NgModule({
  declarations: [
    LogTemplatesComponent,
    LogTemplateComponent,
    UpdateLogTemplateDialogComponent,
    DeleteLogTemplateDialogComponent,
    CreateEventTemplateDialogComponent,
    CreateLogTemplateDialogComponent
  ],
  imports: [
    CommonModule,
    LogTemplatesRoutingModule,
    UiModule,
    StoreModule.forFeature(fromLogTemplate.logTemplatesFeatureKey, fromLogTemplate.logTemplatesReducer),
    StoreModule.forFeature(fromLogTemplate.logTemplateFeatureKey, fromLogTemplate.logTemplateReducer),
    EffectsModule.forFeature([LogTemplateEffects])
  ]
})
export class LogTemplatesModule { }
