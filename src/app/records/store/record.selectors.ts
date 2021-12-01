import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecord from './record.reducer';

export const selectRecordState = createFeatureSelector<fromRecord.State>(
  fromRecord.recordFeatureKey
);
