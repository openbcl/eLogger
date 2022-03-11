import { loadBeep, loadBeepFailure, loadBeepSuccess, loadLanguage, loadLanguageFailure, loadLanguageSuccess, loadSeperator, loadSeperatorFailure, loadSeperatorSuccess, loadTheme, loadThemeFailure, loadThemeSuccess, setBeep, setBeepFailure, setBeepSuccess, setLanguage, setLanguageFailure, setLanguageSuccess, setSeperator, setSeperatorFailure, setSeperatorSuccess, setTheme, setThemeFailure, setThemeSuccess } from './setting.actions';
import { settingsReducer, initialSettingsState } from './setting.reducer';

const settings = { theme: 'light', language: 'en', seperator: ';', beep: false }
const errorTemplate = {}

describe('Setting Reducer', () => {
  describe('Load Theme action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, loadTheme());
      expect(newState.theme).toBe(initialSettingsState.theme);
    });

    it('should return the theme', () => {
      const newState = settingsReducer(initialSettingsState, loadThemeSuccess({ theme: settings.theme }));
      expect(newState.theme).toBe(settings.theme);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, loadThemeFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Language action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, loadLanguage());
      expect(newState.language).toBe(initialSettingsState.language);
    });

    it('should return the language', () => {
      const newState = settingsReducer(initialSettingsState, loadLanguageSuccess({ language: settings.language }));
      expect(newState.language).toBe(settings.language);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, loadLanguageFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Seperator action', () => {
    it('should return the ";"', () => {
      const newState = settingsReducer(initialSettingsState, loadSeperator());
      expect(newState.seperator).toBe(initialSettingsState.seperator);
    });

    it('should return the seperator', () => {
      const newState = settingsReducer(initialSettingsState, loadSeperatorSuccess({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(settings.seperator);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, loadSeperatorFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load Beep action', () => {
    it('should return false', () => {
      const newState = settingsReducer(initialSettingsState, loadBeep());
      expect(newState.beep).toBe(initialSettingsState.beep);
    });

    it('should return beep enabled or not', () => {
      const newState = settingsReducer(initialSettingsState, loadBeepSuccess({ beep: settings.beep }));
      expect(newState.beep).toBe(settings.beep);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, loadBeepFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Theme action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, setTheme({ theme: settings.theme }));
      expect(newState.theme).toBe(initialSettingsState.theme);
    });

    it('should return the theme', () => {
      const newState = settingsReducer(initialSettingsState, setThemeSuccess({ theme: settings.theme }));
      expect(newState.theme).toBe(settings.theme);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, setThemeFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Language action', () => {
    it('should return the undefined', () => {
      const newState = settingsReducer(initialSettingsState, setLanguage({ language: settings.language }));
      expect(newState.language).toBe(initialSettingsState.language);
    });

    it('should return the language', () => {
      const newState = settingsReducer(initialSettingsState, setLanguageSuccess({ language: settings.language }));
      expect(newState.language).toBe(settings.language);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, setLanguageFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Seperator action', () => {
    it('should return the ";"', () => {
      const newState = settingsReducer(initialSettingsState, setSeperator({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(initialSettingsState.seperator);
    });

    it('should return the seperator', () => {
      const newState = settingsReducer(initialSettingsState, setSeperatorSuccess({ seperator: settings.seperator }));
      expect(newState.seperator).toBe(settings.seperator);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, setSeperatorFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Set Beep action', () => {
    it('should return false', () => {
      const newState = settingsReducer(initialSettingsState, setBeep({ beep: settings.beep }));
      expect(newState.beep).toBe(initialSettingsState.beep);
    });

    it('should return beep enabled or not', () => {
      const newState = settingsReducer(initialSettingsState, setBeepSuccess({ beep: settings.beep }));
      expect(newState.beep).toBe(settings.beep);
    });

    it('should return the error', () => {
      const newState = settingsReducer(initialSettingsState, setBeepFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
