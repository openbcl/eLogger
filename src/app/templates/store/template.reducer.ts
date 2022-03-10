import { createReducer, on } from '@ngrx/store';
import { Template } from '../../shared/models';
import * as LazyTemplateActions from './template.actions';
import * as TemplateActions from '../../store/template.actions';

export const templateFeatureKey = 'template';

export interface TemplateState {
  template: Template;
  processing: boolean;
  error: any;
}

export const initialTemplateState: TemplateState = {
  template: null,
  processing: false,
  error: null
};

export const templateReducer = createReducer(
  initialTemplateState,

  on(LazyTemplateActions.loadTemplate, state => ({
    ...state, processing: true
  })),
  on(LazyTemplateActions.loadTemplateSuccess, (state, action) => ({
    ...state, template: action.template, processing: false
  })),
  on(LazyTemplateActions.loadTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyTemplateActions.createTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(TemplateActions.createTemplateSuccess, (state, action) => ({
    ...state, template: action.template, processing: false
  })),
  on(LazyTemplateActions.createTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyTemplateActions.updateTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(TemplateActions.updateTemplateSuccess, (state, action) => ({
    ...state, template: action.template, processing: false
  })),
  on(LazyTemplateActions.updateTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyTemplateActions.deleteTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(TemplateActions.deleteTemplateSuccess, (_state, _action) => ({
    ...initialTemplateState
  })),
  on(LazyTemplateActions.deleteTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
);
