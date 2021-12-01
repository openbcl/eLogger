import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordtypesRoutingModule } from './recordtypes-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromRecordtype from './store/recordtype.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RecordtypeEffects } from './store/recordtype.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecordtypesRoutingModule,
    StoreModule.forFeature(fromRecordtype.recordtypeFeatureKey, fromRecordtype.reducer),
    EffectsModule.forFeature([RecordtypeEffects])
  ]
})
export class RecordtypesModule { }
