import { createReducer, on } from '@ngrx/store';
import * as SettingActions from './setting.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  theme: string,
  seperator: string,
  beep: boolean,
  quality: number,
  error: any
}

export const initialSettingsState: SettingsState = {
  theme: localStorage.getItem('theme') || 'light',
  seperator: $localize`:Default csv seperator@@SettingsState\:defaultSeperator:,`,
  beep: false,
  quality: 5,
  error: null
};

export const settingsReducer = createReducer(
  initialSettingsState,

  on(SettingActions.loadThemeSuccess, (state, action) => ({
    ...state, theme: action.theme
  })),

  on(SettingActions.loadThemeFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.loadSeperatorSuccess, (state, action) => ({
    ...state, seperator: action.seperator
  })),

  on(SettingActions.loadSeperatorFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.loadBeepSuccess, (state, action) => ({
    ...state, beep: action.beep
  })),

  on(SettingActions.loadBeepFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.loadQualitySuccess, (state, action) => ({
    ...state, quality: action.quality
  })),

  on(SettingActions.loadQualityFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.setThemeSuccess, (state, action) => ({
    ...state, theme: action.theme
  })),

  on(SettingActions.setThemeFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.setSeperatorSuccess, (state, action) => ({
    ...state, seperator: action.seperator
  })),

  on(SettingActions.setSeperatorFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.setBeepSuccess, (state, action) => ({
    ...state, beep: action.beep
  })),

  on(SettingActions.setBeepFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.setQualitySuccess, (state, action) => ({
    ...state, quality: action.quality
  })),

  on(SettingActions.setQualityFailure, (state, action) => ({
    ...state, error: action.error
  })),
);
