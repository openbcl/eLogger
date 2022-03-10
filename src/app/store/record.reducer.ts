import { createReducer, on } from '@ngrx/store';
import { Record } from '../models';
import * as RecordActions from './record.actions';

export const recordsFeatureKey = 'records';

export interface RecordsState {
  records: Record[];
  total: number;
  processing: boolean;
  error: any;
}

export const initialRecordsState: RecordsState = {
  records: [],
  total: 0,
  processing: false,
  error: null
};

export const recordsReducer = createReducer(
  initialRecordsState,

  on(RecordActions.loadRecords, state => ({
    ...state, processing: true
  })),
  on(RecordActions.loadRecordsSuccess, (state, action) => ({
    ...state, records: action.records, processing: false
  })),
  on(RecordActions.loadRecordsFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.loadAllRecords, state => ({
    ...state, processing: true
  })),
  on(RecordActions.loadAllRecordsSuccess, (state, action) => ({
    ...state, records: action.records, processing: false
  })),
  on(RecordActions.loadAllRecordsFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.countTotalRecords, state => ({
    ...state, processing: true
  })),
  on(RecordActions.countTotalRecordsSuccess, (state, action) => ({
    ...state, total: action.total, processing: false
  })),
  on(RecordActions.countTotalRecordsFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.createRecord, state => ({
    ...state, processing: true
  })),
  on(RecordActions.createRecordSuccess, (state, action) => ({
    ...state, records: [ ...state.records, action.record ], total: state.total + 1, processing: false
  })),
  on(RecordActions.createRecordFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.revokeRecord, state => ({
    ...state, processing: true
  })),
  on(RecordActions.revokeRecordSuccess, (state, action) => ({
    ...state, records: state.records?.[0]?.logId === action.logId ? state.records.slice(0, -1) : state.records, total: state.total - 1, processing: false
  })),
  on(RecordActions.revokeRecordFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.deleteRecords, state => ({
    ...state, processing: true
  })),
  on(RecordActions.deleteRecordsSuccess, (state, action) => ({
    ...state, records: state.records?.[0]?.logId === action.logId ? [] : state.records, total: 0, processing: false
  })),
  on(RecordActions.deleteRecordsFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
);