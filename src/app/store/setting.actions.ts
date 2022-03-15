import { createAction, props } from '@ngrx/store';

export const loadTheme = createAction(
  '[Setting] Load Theme'
);

export const loadThemeSuccess = createAction(
  '[Setting] Load Theme Success',
  props<{ theme: string }>()
);

export const loadThemeFailure = createAction(
  '[Setting] Load Theme Failure',
  props<{ error: any }>()
);

export const loadSeperator = createAction(
  '[Setting] Load Seperator'
);

export const loadSeperatorSuccess = createAction(
  '[Setting] Load Seperator Success',
  props<{ seperator: string }>()
);

export const loadSeperatorFailure = createAction(
  '[Setting] Load Seperator Failure',
  props<{ error: any }>()
);

export const loadLanguage = createAction(
  '[Setting] Load Language'
);

export const loadLanguageSuccess = createAction(
  '[Setting] Load Language Success',
  props<{ language: string }>()
);

export const loadLanguageFailure = createAction(
  '[Setting] Load Language Failure',
  props<{ error: any }>()
);

export const loadBeep = createAction(
  '[Setting] Load Beep'
);

export const loadBeepSuccess = createAction(
  '[Setting] Load Beep Success',
  props<{ beep: boolean }>()
);

export const loadBeepFailure = createAction(
  '[Setting] Load Beep Failure',
  props<{ error: any }>()
);

export const setTheme = createAction(
  '[Setting] Set Theme',
  props<{ theme: string }>()
);

export const setThemeSuccess = createAction(
  '[Setting] Set Theme Success',
  props<{ theme: string }>()
);

export const setThemeFailure = createAction(
  '[Setting] Set Theme Failure',
  props<{ error: any }>()
);

export const setSeperator = createAction(
  '[Setting] Set Seperator',
  props<{ seperator: string }>()
);

export const setSeperatorSuccess = createAction(
  '[Setting] Set Seperator Success',
  props<{ seperator: string }>()
);

export const setSeperatorFailure = createAction(
  '[Setting] Set Seperator Failure',
  props<{ error: any }>()
);

export const setLanguage = createAction(
  '[Setting] Set Language',
  props<{ language: string }>()
);

export const setLanguageSuccess = createAction(
  '[Setting] Set Language Success',
  props<{ language: string }>()
);

export const setLanguageFailure = createAction(
  '[Setting] Set Language Failure',
  props<{ error: any }>()
);

export const setBeep = createAction(
  '[Setting] Set Beep',
  props<{ beep: boolean }>()
);

export const setBeepSuccess = createAction(
  '[Setting] Set Beep Success',
  props<{ beep: boolean }>()
);

export const setBeepFailure = createAction(
  '[Setting] Set Beep Failure',
  props<{ error: any }>()
);

export const resetDB = createAction(
  '[Setting] Reset Database'
);

export const resetDBSuccess = createAction(
  '[Setting] Reset Database Success'
);

export const resetDBFailure = createAction(
  '[Setting] Reset Database Failure',
  props<{ error: any }>()
);