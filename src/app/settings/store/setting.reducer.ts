import { Action, createReducer, on } from '@ngrx/store';
import * as SettingActions from './setting.actions';

export const settingFeatureKey = 'settings';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(SettingActions.loadSettings, state => state),
  on(SettingActions.loadSettingsSuccess, (state, action) => state),
  on(SettingActions.loadSettingsFailure, (state, action) => state),

);
