import { createAction, props } from '@ngrx/store';
import { Template } from '../../shared/models';

export const loadTemplate = createAction(
  '[Template] Load Template',
  props<{ id?: string }>()
);

export const loadTemplateSuccess = createAction(
  '[Template] Load Template Success',
  props<{ template: Template }>()
);

export const loadTemplateFailure = createAction(
  '[Template] Load Template Failure',
  props<{ error: any }>()
);

export const createTemplate = createAction(
  '[Template] Create Template',
  props<{ title: string, desc: string }>()
);

export const createTemplateFailure = createAction(
  '[Template] Create Template Failure',
  props<{ error: any }>()
);

export const updateTemplate = createAction(
  '[Template] Update Template',
  props<{ template: Template }>()
);

export const updateTemplateFailure = createAction(
  '[Template] Update Template Failure',
  props<{ error: any }>()
);

export const deleteTemplate = createAction(
  '[Template] Delete Template',
  props<{ template: Template }>()
);

export const deleteTemplateFailure = createAction(
  '[Template] Delete Template Failure',
  props<{ error: any }>()
);