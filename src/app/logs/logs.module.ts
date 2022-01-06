import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromLog from './store/log.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LogEffects } from './store/log.effects';
import { UiModule } from '../ui/ui.module';
import { LogsComponent } from './components/logs/logs.component';



@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    UiModule,
    StoreModule.forFeature(fromLog.logFeatureKey, fromLog.logReducer),
    StoreModule.forFeature(fromLog.logsFeatureKey, fromLog.logsReducer),
    EffectsModule.forFeature([LogEffects])
  ]
})
export class LogsModule { }
