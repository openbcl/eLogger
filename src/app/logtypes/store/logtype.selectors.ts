import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogtype from './logtype.reducer';

export const selectLogtypeState = createFeatureSelector<fromLogtype.State>(
  fromLogtype.logtypeFeatureKey
);
