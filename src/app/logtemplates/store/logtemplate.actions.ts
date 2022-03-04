import { createAction, props } from '@ngrx/store';
import { LogTemplate } from '../../shared/models';

export const loadLogTemplate = createAction(
  '[LogTemplate] Load LogTemplate',
  props<{ id?: string }>()
);

export const loadLogTemplateSuccess = createAction(
  '[LogTemplate] Load LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);

export const loadLogTemplateFailure = createAction(
  '[LogTemplate] Load LogTemplate Failure',
  props<{ error: any }>()
);

export const createLogTemplate = createAction(
  '[LogTemplate] Create LogTemplate',
  props<{ title: string, desc: string }>()
);

export const createLogTemplateFailure = createAction(
  '[LogTemplate] Create LogTemplate Failure',
  props<{ error: any }>()
);

export const updateLogTemplate = createAction(
  '[LogTemplate] Update LogTemplate',
  props<{ logTemplate: LogTemplate }>()
);

export const updateLogTemplateFailure = createAction(
  '[LogTemplate] Update LogTemplate Failure',
  props<{ error: any }>()
);

export const deleteLogTemplate = createAction(
  '[LogTemplate] Delete LogTemplate',
  props<{ logTemplate: LogTemplate }>()
);

export const deleteLogTemplateFailure = createAction(
  '[LogTemplate] Delete LogTemplate Failure',
  props<{ error: any }>()
);