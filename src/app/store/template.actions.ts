import { createAction, props } from '@ngrx/store';
import { Template } from '../shared/models';

export const loadTemplates = createAction(
  '[Template] Load Templates'
);

export const loadTemplatesFailure = createAction(
  '[Template] Load Templates Failure',
  props<{ error: any }>()
);
  
export const loadTemplatesSuccess = createAction(
  '[Template] Load Templates Success',
  props<{ templates: Template[] }>()
);

export const createTemplateSuccess = createAction(
  '[Template] Create Template Success',
  props<{ template: Template }>()
);

export const updateTemplateSuccess = createAction(
  '[Template] Update Template Success',
  props<{ template: Template }>()
);


export const deleteTemplateSuccess = createAction(
  '[Template] Delete Template Success',
  props<{ template: Template }>()
);

export const patchTemplates = createAction(
  '[Template] Patch Templates',
  props<{ templates: Partial<Template>[] }>()
);

export const patchTemplatesFailure = createAction(
  '[Template] Patch Templates Failure',
  props<{ error: any }>()
);
  
export const patchTemplatesSuccess = createAction(
  '[Template] Patch Templates Success',
  props<{ templates: Template[] }>()
);