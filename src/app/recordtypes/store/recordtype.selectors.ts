import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecordtype from './recordtype.reducer';

export const selectRecordtypeState = createFeatureSelector<fromRecordtype.State>(
  fromRecordtype.recordtypeFeatureKey
);
