import * as fromSetting from './setting.reducer';
import { beepSelector, languageSelector, seperatorSelector, settingsStateSelector, themeSelector } from './setting.selectors';

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
    expect(result).toEqual(undefined);
  });
  it('should select the initial seperator', () => {
    const result = seperatorSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(';');
  });
  it('should select the initial language', () => {
    const result = languageSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(undefined);
  });
  it('should select the initial beep setting', () => {
    const result = beepSelector({
      [fromSetting.settingsFeatureKey]: fromSetting.initialSettingsState
    });
    expect(result).toEqual(false);
  });
});
