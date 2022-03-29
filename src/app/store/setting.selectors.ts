import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSetting from './setting.reducer';

export const settingsStateSelector = createFeatureSelector<fromSetting.SettingsState>(
  fromSetting.settingsFeatureKey
);

export const themeSelector = createSelector(
  settingsStateSelector,
  settingsState => settingsState.theme
)

export const languageSelector = createSelector(
  settingsStateSelector,
  settingsState => settingsState.language
)

export const seperatorSelector = createSelector(
  settingsStateSelector,
  settingsState => settingsState.seperator
)

export const beepSelector = createSelector(
  settingsStateSelector,
  settingsState => settingsState.beep
)

export const qualitySelector = createSelector(
  settingsStateSelector,
  settingsState => settingsState.quality
)