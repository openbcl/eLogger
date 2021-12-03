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

export const loadLogType = createAction(
  '[LogType] Load LogType',
  props<{ id: string }>()
);

export const loadLogTypeSuccess = createAction(
  '[LogType] Load LogType Success',
  props<{ logType: LogType }>()
);

export const loadLogTypeFailure = createAction(
  '[LogType] Load LogType Failure',
  props<{ error: any }>()
);

export const createLogType = createAction(
  '[LogType] Create LogType',
  props<{ logType: LogType }>()
);

export const createLogTypeSuccess = createAction(
  '[LogType] Create LogType Success',
  props<{ logType: LogType }>()
);

export const createLogTypeFailure = createAction(
  '[LogType] Create LogType Failure',
  props<{ error: any }>()
);

export const updateLogType = createAction(
  '[LogType] Update LogType',
  props<{ logType: LogType }>()
);

export const updateLogTypeSuccess = createAction(
  '[LogType] Update LogType Success',
  props<{ logType: LogType }>()
);

export const updateLogTypeFailure = createAction(
  '[LogType] Update LogType Failure',
  props<{ error: any }>()
);

export const deleteLogType = createAction(
  '[LogType] Delete LogType',
  props<{ logType: LogType }>()
);

export const deleteLogTypeSuccess = createAction(
  '[LogType] Delete LogType Success',
  props<{ logType: LogType }>()
);

export const deleteLogTypeFailure = createAction(
  '[LogType] Delete LogType Failure',
  props<{ error: any }>()
);