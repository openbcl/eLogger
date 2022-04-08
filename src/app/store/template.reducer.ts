import { createReducer, on } from '@ngrx/store';
import { Template } from '../models';
import * as TemplateActions from './template.actions';
import * as SettingActions from './setting.actions';

export const templatesFeatureKey = 'templates';

export interface TemplatesState {
  templates: Template[];
  processing: boolean;
  error: any;
}

export const initialTemplatesState: TemplatesState = {
  templates: [],
  processing: false,
  error: null
};

export const templatesReducer = createReducer(
  initialTemplatesState,

  on(TemplateActions.loadTemplates, state => ({
    ...state, processing: true
  })),
  on(TemplateActions.loadTemplatesSuccess, (state, action) => ({
    ...state, templates: action.templates, processing: false
  })),
  on(TemplateActions.loadTemplatesFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(TemplateActions.createTemplateSuccess, (state, action) => ({
    ...state, templates: [ ...state.templates, action.template ], processing: false
  })),
  on(TemplateActions.updateTemplateSuccess, (state, action) => ({
    ...state, templates: state.templates.map(oldTemplate => oldTemplate.id === action.template.id ? action.template : oldTemplate ), processing: false
  })),
  on(TemplateActions.deleteTemplateSuccess, (state, action) => ({
    ...state, templates: state.templates.filter(oldTemplate => oldTemplate.id !== action.template.id), processing: false
  })),
  on(TemplateActions.patchTemplatesSuccess, (state, action) => ({
    ...state, templates: [ ...state.templates.filter(oldTemplate => !action.templates.map(template => template.id).includes(oldTemplate.id)), ...action.templates ], processing: false
  })),
  on(SettingActions.resetDBSuccess, (state, _action) => ({
    ...state, templates: []
  })),
);