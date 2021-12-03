import { Action, createReducer, on } from '@ngrx/store';
import * as LogtypeActions from './logtype.actions';

export const logtypeFeatureKey = 'logtype';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(LogtypeActions.loadLogtypes, state => state),
  on(LogtypeActions.loadLogtypesSuccess, (state, action) => state),
  on(LogtypeActions.loadLogtypesFailure, (state, action) => state),

);
