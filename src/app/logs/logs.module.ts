import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromLog from './store/log.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LogEffects } from './store/log.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogsRoutingModule,
    StoreModule.forFeature(fromLog.logFeatureKey, fromLog.reducer),
    EffectsModule.forFeature([LogEffects])
  ]
})
export class LogsModule { }
