import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogtypesRoutingModule } from './logtypes-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromLogtype from './store/logtype.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LogtypeEffects } from './store/logtype.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogtypesRoutingModule,
    StoreModule.forFeature(fromLogtype.logtypeFeatureKey, fromLogtype.reducer),
    EffectsModule.forFeature([LogtypeEffects])
  ]
})
export class LogtypesModule { }
