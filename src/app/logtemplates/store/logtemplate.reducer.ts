import { createReducer, on } from '@ngrx/store';
import { LogTemplate } from '../../shared/models';
import * as LogTemplateActions from './logtemplate.actions';

export const logTemplatesFeatureKey = 'logTemplates';

export interface LogTemplatesState {
  logTemplates: LogTemplate[];
  processing: boolean;
  error: any;
}

export const initialLogTemplatesState: LogTemplatesState = {
  logTemplates: [],
  processing: false,
  error: null
};

export const logTemplatesReducer = createReducer(
  initialLogTemplatesState,

  on(LogTemplateActions.loadLogTemplates, state => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.loadLogTemplatesSuccess, (state, action) => ({
    ...state, logTemplates: action.logTemplates, processing: false
  })),
  on(LogTemplateActions.loadLogTemplatesFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTemplateActions.createLogTemplateSuccess, (state, action) => ({
    ...state, logTemplates: [ ...state.logTemplates, action.logTemplate ], processing: false
  })),
  on(LogTemplateActions.updateLogTemplateSuccess, (state, action) => ({
    ...state, logTemplates: state.logTemplates.map(oldLogTemplate => oldLogTemplate.id === action.logTemplate.id ? action.logTemplate : oldLogTemplate ), processing: false
  })),
  on(LogTemplateActions.deleteLogTemplateSuccess, (state, action) => ({
    ...state, logTemplates: state.logTemplates.filter(oldLogTemplate => oldLogTemplate.id !== action.logTemplate.id), processing: false
  })),
);

export const logTemplateFeatureKey = 'logTemplate';

export interface LogTemplateState {
  logTemplate: LogTemplate;
  processing: boolean;
  error: any;
}

export const initialLogTemplateState: LogTemplateState = {
  logTemplate: null,
  processing: false,
  error: null
};

export const logTemplateReducer = createReducer(
  initialLogTemplateState,

  on(LogTemplateActions.loadLogTemplate, state => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.loadLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LogTemplateActions.loadLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTemplateActions.createLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.createLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LogTemplateActions.createLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTemplateActions.updateLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.updateLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LogTemplateActions.updateLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LogTemplateActions.deleteLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.deleteLogTemplateSuccess, (_state, _action) => ({
    ...initialLogTemplateState
  })),
  on(LogTemplateActions.deleteLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
);
