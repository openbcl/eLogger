import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogTemplate from './logtemplate.reducer';

export const logTemplatesStateSelector = createFeatureSelector<fromLogTemplate.LogTemplatesState>(
  fromLogTemplate.logTemplatesFeatureKey
);

export const logTemplatesSelector = createSelector(
  logTemplatesStateSelector,
  logTemplatesState => logTemplatesState.logTemplates
)

export const logTemplatesProcessingSelector = createSelector(
  logTemplatesStateSelector,
  logTemplatesState => logTemplatesState.processing
)

export const logTemplateStateSelector = createFeatureSelector<fromLogTemplate.LogTemplateState>(
  fromLogTemplate.logTemplateFeatureKey
);

export const logTemplateSelector = createSelector(
  logTemplateStateSelector,
  logTemplateState => logTemplateState.logTemplate
)

export const logTemplateProcessingSelector = createSelector(
  logTemplateStateSelector,
  logTemplateState => logTemplateState.processing
)