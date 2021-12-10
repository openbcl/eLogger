import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLog from './log.reducer';

export const selectLogsState = createFeatureSelector<fromLog.LogsState>(
  fromLog.logsFeatureKey
);

export const selectLogs = createSelector(
  selectLogsState,
  logsState => logsState.logs
)

export const selectLogsProcessing = createSelector(
  selectLogsState,
  logsState => logsState.processing
)

export const selectLogState = createFeatureSelector<fromLog.LogState>(
  fromLog.logFeatureKey
);

export const selectLog = createSelector(
  selectLogState,
  logState => logState.log
)

export const selectLogProcessing = createSelector(
  selectLogState,
  logState => logState.processing
)