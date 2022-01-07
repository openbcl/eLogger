import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogTypesRoutingModule } from './logtypes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LogTypeEffects } from './store/logtype.effects';
import * as fromLogType from './store/logtype.reducer';
import { UiModule } from '../ui/ui.module';
import { LogTypesComponent } from './components/logtypes/logtypes.component';
import { LogTypeComponent } from './components/logtype/logtype.component';


@NgModule({
  declarations: [
    LogTypesComponent,
    LogTypeComponent
  ],
  imports: [
    CommonModule,
    LogTypesRoutingModule,
    UiModule,
    StoreModule.forFeature(fromLogType.logTypesFeatureKey, fromLogType.logTypesReducer),
    StoreModule.forFeature(fromLogType.logTypeFeatureKey, fromLogType.logTypeReducer),
    EffectsModule.forFeature([LogTypeEffects])
  ]
})
export class LogTypesModule { }
