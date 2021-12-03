import { Action, createReducer, on } from '@ngrx/store';
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

export const loadLogTypesReducer = createReducer(
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

);
