import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogTypesRoutingModule } from './logtypes-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromLogType from './store/logtype.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LogTypeEffects } from './store/logtype.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogTypesRoutingModule,
    StoreModule.forFeature(fromLogType.logtypeFeatureKey, fromLogType.reducer),
    EffectsModule.forFeature([LogTypeEffects])
  ]
})
export class LogTypesModule { }
