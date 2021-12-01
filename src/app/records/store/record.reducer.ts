import { Action, createReducer, on } from '@ngrx/store';
import * as RecordActions from './record.actions';

export const recordFeatureKey = 'record';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(RecordActions.loadRecords, state => state),
  on(RecordActions.loadRecordsSuccess, (state, action) => state),
  on(RecordActions.loadRecordsFailure, (state, action) => state),

);
