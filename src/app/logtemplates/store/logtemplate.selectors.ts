import { createFeatureSelector, createSelector } from '@ngrx/store';
import { deepCompareEventTemplates } from '../../shared/utils/helper';
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

export const eventTemplatesSelector = createSelector(
  logTemplatesStateSelector,
  logTemplateStateSelector,
  (logTemplatesState, logTemplateState) => logTemplatesState.logTemplates
    .flatMap(logTemplate => logTemplate.eventTemplates)
    .filter((eventTemplate, i, allEventTemplates) => (
      i === allEventTemplates.findIndex(item => deepCompareEventTemplates(item, eventTemplate)) &&
      (!logTemplateState.logTemplate?.eventTemplates?.length || !logTemplateState.logTemplate.eventTemplates.find(item => deepCompareEventTemplates(item, eventTemplate)))
    ))
)