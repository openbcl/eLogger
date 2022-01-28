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


@NgModule({
  declarations: [
    LogTemplatesComponent,
    LogTemplateComponent
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
