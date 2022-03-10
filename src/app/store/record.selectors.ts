import { createFeatureSelector, createSelector } from '@ngrx/store';
import { groupByKey } from '../utils/helper';
import { Record } from '../models'
import * as fromRecord from './record.reducer';

export const recordsStateSelector = createFeatureSelector<fromRecord.RecordsState>(
  fromRecord.recordsFeatureKey
);

export const recordsProcessingSelector = createSelector(
  recordsStateSelector,
  recordsState => recordsState.processing
)

export const recordsSelector = (logId: string) => createSelector(
  recordsStateSelector,
  recordsState => recordsState.records.filter(record => record.logId === logId)
)

export const allRecordsSelector = createSelector(
  recordsStateSelector,
  recordsState => groupByKey<Record>(recordsState.records, 'logId')
)

export const totalRecordsSelector = createSelector(
  recordsStateSelector,
  recordsState => recordsState.total
)

