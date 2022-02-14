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