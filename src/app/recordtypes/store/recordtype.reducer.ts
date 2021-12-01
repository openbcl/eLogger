import { Action, createReducer, on } from '@ngrx/store';
import * as RecordtypeActions from './recordtype.actions';

export const recordtypeFeatureKey = 'recordtype';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(RecordtypeActions.loadRecordtypes, state => state),
  on(RecordtypeActions.loadRecordtypesSuccess, (state, action) => state),
  on(RecordtypeActions.loadRecordtypesFailure, (state, action) => state),

);
