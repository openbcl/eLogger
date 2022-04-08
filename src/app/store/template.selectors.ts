import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTemplate from './template.reducer';

export const templatesStateSelector = createFeatureSelector<fromTemplate.TemplatesState>(
  fromTemplate.templatesFeatureKey
);

export const templatesSelector = createSelector(
  templatesStateSelector,
  templatesState => templatesState.templates
)

export const templatesProcessingSelector = createSelector(
  templatesStateSelector,
  templatesState => templatesState.processing
)