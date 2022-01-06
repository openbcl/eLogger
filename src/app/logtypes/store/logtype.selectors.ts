import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogType from './logtype.reducer';

export const logTypesStateSelector = createFeatureSelector<fromLogType.LogTypesState>(
  fromLogType.logTypesFeatureKey
);

export const logTypesSelector = createSelector(
  logTypesStateSelector,
  logTypesState => logTypesState.logTypes
)

export const logTypesProcessingSelector = createSelector(
  logTypesStateSelector,
  logTypesState => logTypesState.processing
)

export const logTypeStateSelector = createFeatureSelector<fromLogType.LogTypeState>(
  fromLogType.logTypeFeatureKey
);

export const logTypeSelector = createSelector(
  logTypeStateSelector,
  logTypeState => logTypeState.logType
)

export const logTypeProcessingSelector = createSelector(
  logTypeStateSelector,
  logTypeState => logTypeState.processing
)