import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLog from './log.reducer';

export const logsStateSelector = createFeatureSelector<fromLog.LogsState>(
  fromLog.logsFeatureKey
);

export const logsSelector = createSelector(
  logsStateSelector,
  logsState => logsState.logs
)

export const logsProcessingSelector = createSelector(
  logsStateSelector,
  logsState => logsState.processing
)