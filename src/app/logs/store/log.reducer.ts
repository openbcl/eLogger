import { createReducer, on } from '@ngrx/store';
import { Log } from '../../shared/models';
import * as LazyLogActions from './log.actions';
import * as LogActions from '../../store/log.actions';
import * as RecordActions from '../../store/record.actions';

export const logFeatureKey = 'log';

export interface LogState {
  log: Log;
  processing: boolean;
  error: any;
}

export const initialLogState: LogState = {
  log: null,
  processing: false,
  error: null
};

export const logReducer = createReducer(
  initialLogState,

  on(LazyLogActions.loadLog, state => ({
    ...state, processing: true
  })),
  on(LazyLogActions.loadLogSuccess, (state, action) => ({
    ...state, log: action.log, processing: false
  })),
  on(LazyLogActions.loadLogFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogActions.createLog, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogActions.createLogSuccess, (state, action) => ({
    ...state, log: action.log, processing: false
  })),
  on(LazyLogActions.createLogFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogActions.updateLog, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogActions.updateLogSuccess, (state, action) => ({
    ...state, log: action.log, processing: false
  })),
  on(LazyLogActions.updateLogFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogActions.deleteLog, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogActions.deleteLogSuccess, (_state, _action) => ({
    ...initialLogState
  })),
  on(LazyLogActions.deleteLogFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(RecordActions.createRecordSuccess, (state, _action) => ({
    ...state, log: { ...state.log, recordsCount: state.log.recordsCount + 1 }
  })),
  on(RecordActions.revokeRecordSuccess, (state, _action) => ({
    ...state, log: { ...state.log, recordsCount: state.log.recordsCount - 1 }
  })),
  on(RecordActions.deleteRecordsSuccess, (state, _action) => ({
    ...state, log: { ...state.log, recordsCount: 0 }
  })),
);
