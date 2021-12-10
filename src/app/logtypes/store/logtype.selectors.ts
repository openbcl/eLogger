import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogType from './logtype.reducer';

export const selectLogTypesState = createFeatureSelector<fromLogType.LogTypesState>(
  fromLogType.logTypesFeatureKey
);

export const selectLogTypes = createSelector(
  selectLogTypesState,
  logTypesState => logTypesState.logTypes
)

export const selectLogTypesProcessing = createSelector(
  selectLogTypesState,
  logTypesState => logTypesState.processing
)

export const selectLogTypeState = createFeatureSelector<fromLogType.LogTypeState>(
  fromLogType.logTypeFeatureKey
);

export const selectLogType = createSelector(
  selectLogTypeState,
  logTypeState => logTypeState.logType
)

export const selectLogTypeProcessing = createSelector(
  selectLogTypeState,
  logTypeState => logTypeState.processing
)