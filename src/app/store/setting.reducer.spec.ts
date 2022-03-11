import * as SettingAction from './setting.actions';
import { settingsReducer, initialSettingsState } from './setting.reducer';

const settings = { theme: 'light', language: 'en', seperator: ';', beep: false }
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

  describe('Load Language action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadLanguage());
      expect(newState.language).toBe(initialSettingsState.language);
    });

    it('should return the language', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadLanguageSuccess({ language: settings.language }));
      expect(newState.language).toBe(settings.language);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.loadLanguageFailure({ error: errorTemplate }));
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

  describe('Set Language action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setLanguage({ language: settings.language }));
      expect(newState.language).toBe(initialSettingsState.language);
    });

    it('should return the language', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setLanguageSuccess({ language: settings.language }));
      expect(newState.language).toBe(settings.language);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, SettingAction.setLanguageFailure({ error: errorTemplate }));
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
});
