import { createReducer, on } from '@ngrx/store';
import * as SettingActions from './setting.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  theme: string,
  seperator: string,
  language: string,
  beep: boolean,
  error: any
}

export const initialSettingsState: SettingsState = {
  theme: localStorage.getItem('theme') || 'light',
  seperator: ';',
  language: undefined,
  beep: false,
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

  on(SettingActions.loadLanguageSuccess, (state, action) => ({
    ...state, language: action.language
  })),

  on(SettingActions.loadLanguageFailure, (state, action) => ({
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

  on(SettingActions.setThemeSuccess, (state, action) => ({
    ...state, theme: action.theme
  })),

  on(SettingActions.setThemeFailure, (state, action) => ({
    ...state, error: action.error
  })),

  on(SettingActions.setLanguageSuccess, (state, action) => ({
    ...state, language: action.language
  })),

  on(SettingActions.setLanguageFailure, (state, action) => ({
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
);
