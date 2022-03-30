import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShare from './share.reducer';

export const shareStateSelector = createFeatureSelector<fromShare.ShareState>(
  fromShare.shareFeatureKey
);

export const downloadingSelector = createSelector(
  shareStateSelector,
  shareState => shareState.processing
)