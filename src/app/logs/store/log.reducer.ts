import { Action, createReducer, on } from '@ngrx/store';
import * as LogActions from './log.actions';

export const logFeatureKey = 'log';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(LogActions.loadLogs, state => state),
  on(LogActions.loadLogsSuccess, (state, action) => state),
  on(LogActions.loadLogsFailure, (state, action) => state),

);
