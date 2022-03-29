import * as fromSetting from './setting.reducer';
import { beepSelector, qualitySelector, languageSelector, seperatorSelector, settingsStateSelector, themeSelector } from './setting.selectors';

describe('Setting Selectors', () => {
  it('should select the initial feature state', () => {
    const result = settingsStateSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState);
  });
  it('should select the initial theme', () => {
    const result = themeSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState.theme);
  });
  it('should select the initial seperator', () => {
    const result = seperatorSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState.seperator);
  });
  it('should select the initial language', () => {
    const result = languageSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState.language);
  });
  it('should select the initial beep setting', () => {
    const result = beepSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState.beep);
  });
  it('should select the initial quality setting', () => {
    const result = qualitySelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(fromSetting.initialSettingsState.quality);
  });
});
