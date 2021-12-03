import { createAction, props } from '@ngrx/store';
import { LogType } from '../../shared/models';

export const loadLogTypes = createAction(
  '[LogType] Load LogTypes'
);

export const loadLogTypesSuccess = createAction(
  '[LogType] Load LogTypes Success',
  props<{ logTypes: LogType[] }>()
);

export const loadLogTypesFailure = createAction(
  '[LogType] Load LogTypes Failure',
  props<{ error: any }>()
);
