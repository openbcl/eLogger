import { createAction, props } from '@ngrx/store';
import { LogTemplate } from '../shared/models';

export const loadLogTemplates = createAction(
  '[LogTemplate] Load LogTemplates'
);

export const loadLogTemplatesFailure = createAction(
  '[LogTemplate] Load LogTemplates Failure',
  props<{ error: any }>()
);
  
export const loadLogTemplatesSuccess = createAction(
  '[LogTemplate] Load LogTemplates Success',
  props<{ logTemplates: LogTemplate[] }>()
);

export const createLogTemplateSuccess = createAction(
  '[LogTemplate] Create LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);

export const updateLogTemplateSuccess = createAction(
  '[LogTemplate] Update LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);


export const deleteLogTemplateSuccess = createAction(
  '[LogTemplate] Delete LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);

export const patchLogTemplate = createAction(
  '[LogTemplate] Patch LogTemplate',
  props<{ logTemplate: Partial<LogTemplate> }>()
);

export const patchLogTemplateFailure = createAction(
  '[LogTemplate] Patch LogTemplate Failure',
  props<{ error: any }>()
);
  
export const patchLogTemplateSuccess = createAction(
  '[LogTemplate] Patch LogTemplate Success',
  props<{ logTemplate: LogTemplate }>()
);