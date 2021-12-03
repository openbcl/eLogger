import { Action, createReducer, on } from '@ngrx/store';
import * as LogTypeActions from './logtype.actions';

export const logtypeFeatureKey = 'logtype';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(LogTypeActions.loadLogTypes, state => state),
  on(LogTypeActions.loadLogTypesSuccess, (state, action) => state),
  on(LogTypeActions.loadLogTypesFailure, (state, action) => state),

);
