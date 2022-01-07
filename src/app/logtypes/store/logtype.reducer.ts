import { createReducer, on } from '@ngrx/store';
import { LogType } from '../../shared/models';
import * as LogTypeActions from './logtype.actions';

export const logTypesFeatureKey = 'logTypes';

export interface LogTypesState {
  logTypes: LogType[];
  processing: boolean;
  error: any;
}

export const initialLogTypesState: LogTypesState = {
  logTypes: [],
  processing: false,
  error: null
};

export const logTypesReducer = createReducer(
  initialLogTypesState,

  on(LogTypeActions.loadLogTypes, state => ({
    ...state, processing: true
  })),
  on(LogTypeActions.loadLogTypesSuccess, (state, action) => ({
    ...state, logTypes: action.logTypes, processing: false
  })),
  on(LogTypeActions.loadLogTypesFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTypeActions.createLogTypeSuccess, (state, action) => ({
    ...state, logTypes: [ ...state.logTypes, action.logType ], processing: false
  })),
  on(LogTypeActions.updateLogTypeSuccess, (state, action) => ({
    ...state, logTypes: state.logTypes.map(oldLogType => oldLogType.id === action.logType.id ? action.logType : oldLogType ), processing: false
  })),
  on(LogTypeActions.deleteLogTypeSuccess, (state, action) => ({
    ...state, logTypes: state.logTypes.filter(oldLogType => oldLogType.id !== action.logType.id), processing: false
  })),
);

export const logTypeFeatureKey = 'logType';

export interface LogTypeState {
  logType: LogType;
  processing: boolean;
  error: any;
}

export const initialLogTypeState: LogTypeState = {
  logType: null,
  processing: false,
  error: null
};

export const logTypeReducer = createReducer(
  initialLogTypeState,

  on(LogTypeActions.loadLogType, state => ({
    ...state, processing: true
  })),
  on(LogTypeActions.loadLogTypeSuccess, (state, action) => ({
    ...state, logType: action.logType, processing: false
  })),
  on(LogTypeActions.loadLogTypeFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTypeActions.createLogType, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTypeActions.createLogTypeSuccess, (state, action) => ({
    ...state, logType: action.logType, processing: false
  })),
  on(LogTypeActions.createLogTypeFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTypeActions.updateLogType, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTypeActions.updateLogTypeSuccess, (state, action) => ({
    ...state, logType: action.logType, processing: false
  })),
  on(LogTypeActions.updateLogTypeFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTypeActions.deleteLogType, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTypeActions.deleteLogTypeSuccess, (_state, _action) => ({
    ...initialLogTypeState
  })),
  on(LogTypeActions.deleteLogTypeFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
);
