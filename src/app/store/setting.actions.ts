import { createAction, props } from '@ngrx/store';

export const loadSettings = createAction(
  '[Setting] Load Settings'
);

export const loadSettingsSuccess = createAction(
  '[Setting] Load Settings Success',
  props<{ data: any }>()
);

export const loadSettingsFailure = createAction(
  '[Setting] Load Settings Failure',
  props<{ error: any }>()
);
