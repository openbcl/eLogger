import { createReducer, on } from '@ngrx/store';
import * as ShareActions from './share.actions';

export const shareFeatureKey = 'share';

export interface ShareState {
  processing: boolean;
  error: any
}
  
export const initialShareState: ShareState = {
  processing: false,
  error: null
};

export const shareReducer = createReducer(
  initialShareState,

  on(ShareActions.shareRecords, state => ({
    ...state, processing: true
  })),
  on(ShareActions.shareLogs, state => ({
    ...state, processing: true
  })),
  on(ShareActions.shareSuccess, (state, _action) => ({
    ...state, processing: false
  })),
  on(ShareActions.shareFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  }))
);