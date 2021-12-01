import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromRecord from './store/record.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RecordEffects } from './store/record.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    StoreModule.forFeature(fromRecord.recordFeatureKey, fromRecord.reducer),
    EffectsModule.forFeature([RecordEffects])
  ]
})
export class RecordsModule { }
