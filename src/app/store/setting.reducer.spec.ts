import * as SettingAction from './setting.actions';
import { settingsReducer, initialSettingsState } from './setting.reducer';

const settings = { theme: 'light', seperator: ';', beep: false, quality: 8 }
const errorTemplate = {}

describe('Setting Reducer', () => {
  describe('Load Theme action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadTheme());
      expect(newState.theme).toBe(initialSettingsState.theme);
    });

    it('should return the theme', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadThemeSuccess({ theme: settings.theme }));
      expect(newState.theme).toBe(settings.theme);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadThemeFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Seperator action', () => {
    it('should return the ";"', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadSeperator());
      expect(newState.seperator).toBe(initialSettingsState.seperator);
    });

    it('should return the seperator', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadSeperatorSuccess({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(settings.seperator);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadSeperatorFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Beep action', () => {
    it('should return false', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadBeep());
      expect(newState.beep).toBe(initialSettingsState.beep);
    });

    it('should return beep enabled or not', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadBeepSuccess({ beep: settings.beep }));
      expect(newState.beep).toBe(settings.beep);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadBeepFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Quality action', () => {
    it('should return 5', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadQuality());
      expect(newState.quality).toBe(initialSettingsState.quality);
    });

    it('should return quality level', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadQualitySuccess({ quality: settings.quality }));
      expect(newState.quality).toBe(settings.quality);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadQualityFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Theme action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setTheme({ theme: settings.theme }));
      expect(newState.theme).toBe(initialSettingsState.theme);
    });

    it('should return the theme', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setThemeSuccess({ theme: settings.theme }));
      expect(newState.theme).toBe(settings.theme);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setThemeFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Seperator action', () => {
    it('should return the ";"', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setSeperator({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(initialSettingsState.seperator);
    });

    it('should return the seperator', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setSeperatorSuccess({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(settings.seperator);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setSeperatorFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Beep action', () => {
    it('should return false', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setBeep({ beep: settings.beep }));
      expect(newState.beep).toBe(initialSettingsState.beep);
    });

    it('should return beep enabled or not', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setBeepSuccess({ beep: settings.beep }));
      expect(newState.beep).toBe(settings.beep);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setBeepFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Quality action', () => {
    it('should return 8', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setQuality({ quality: settings.quality }));
      expect(newState.quality).toBe(initialSettingsState.quality);
    });

    it('should return quality level', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setQualitySuccess({ quality: settings.quality }));
      expect(newState.quality).toBe(settings.quality);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setQualityFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
