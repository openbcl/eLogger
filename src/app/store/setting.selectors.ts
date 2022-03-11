import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSetting from './setting.reducer';

export const settingStateSelector = createFeatureSelector<fromSetting.State>(
  fromSetting.settingFeatureKey
);
