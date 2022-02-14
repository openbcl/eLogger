import { createReducer, on } from '@ngrx/store';
import { Log } from '../shared/models';
import * as LogActions from './log.actions';

export const logsFeatureKey = 'logs';

export interface LogsState {
  logs: Log[];
  processing: boolean;
  error: any;
}

export const initialLogsState: LogsState = {
  logs: [],
  processing: false,
  error: null
};

export const logsReducer = createReducer(
  initialLogsState,

  on(LogActions.loadLogs, state => ({
    ...state, processing: true
  })),
  on(LogActions.loadLogsSuccess, (state, action) => ({
    ...state, logs: action.logs, processing: false
  })),
  on(LogActions.loadLogsFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogActions.createLogSuccess, (state, action) => ({
    ...state, logs: [ ...state.logs, action.log ], processing: false
  })),
  on(LogActions.updateLogSuccess, (state, action) => ({
    ...state, logs: state.logs.map(oldLog => oldLog.id === action.log.id ? action.log : oldLog ), processing: false
  })),
  on(LogActions.deleteLogSuccess, (state, action) => ({
    ...state, logs: state.logs.filter(oldLog => oldLog.id !== action.log.id), processing: false
  })),
);