import { createReducer, on } from '@ngrx/store';
import { LogTemplate } from '../../shared/models';
import * as LazyLogTemplateActions from './logtemplate.actions';
import * as LogTemplateActions from '../../store/logtemplate.actions';

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

  on(LazyLogTemplateActions.loadLogTemplate, state => ({
    ...state, processing: true
  })),
  on(LazyLogTemplateActions.loadLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LazyLogTemplateActions.loadLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogTemplateActions.createLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.createLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LazyLogTemplateActions.createLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogTemplateActions.updateLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.updateLogTemplateSuccess, (state, action) => ({
    ...state, logTemplate: action.logTemplate, processing: false
  })),
  on(LazyLogTemplateActions.updateLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
  on(LazyLogTemplateActions.deleteLogTemplate, (state, _action) => ({
    ...state, processing: true
  })),
  on(LogTemplateActions.deleteLogTemplateSuccess, (_state, _action) => ({
    ...initialLogTemplateState
  })),
  on(LazyLogTemplateActions.deleteLogTemplateFailure, (state, action) => ({
    ...state, error: action.error, processing: false
  })),
);
