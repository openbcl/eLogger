import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogType from './logtype.reducer';

export const selectLogTypeState = createFeatureSelector<fromLogType.LogTypesState>(
  fromLogType.logTypesFeatureKey
);
