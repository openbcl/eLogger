import { createAction, props } from '@ngrx/store';
import { LogTemplate } from '../../shared/models';

export const loadLogTemplates = createAction(
  '[LogTemplate] Load LogTemplates'
);

export const loadLogTemplatesSuccess = createAction(
  '[LogTemplate] Load LogTemplates Success',
  props<{ logTemplates: LogTemplate[] }>()
);

export const loadLogTemplatesFailure = createAction(
  '[LogTemplate] Load LogTemplates Failure',
  props<{ error: any }>()
);

export const loadLogTemplate = createAction(
  '[LogTemplate] Load LogTemplate',
  props<{ id: string }>()
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
  props<{ title: string, desc?: string }>()
);

export const createLogTemplateSuccess = createAction(
  '[LogTemplate] Create LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);

export const createLogTemplateFailure = createAction(
  '[LogTemplate] Create LogTemplate Failure',
  props<{ error: any }>()
);

export const updateLogTemplate = createAction(
  '[LogTemplate] Update LogTemplate',
  props<{ logTemplate: LogTemplate }>()
);

export const updateLogTemplateSuccess = createAction(
  '[LogTemplate] Update LogTemplate Success',
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

export const deleteLogTemplateSuccess = createAction(
  '[LogTemplate] Delete LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);

export const deleteLogTemplateFailure = createAction(
  '[LogTemplate] Delete LogTemplate Failure',
  props<{ error: any }>()
);