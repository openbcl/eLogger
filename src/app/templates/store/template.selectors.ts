import { createFeatureSelector, createSelector } from '@ngrx/store';
import { templatesStateSelector } from '../../store/template.selectors';
import { deepCompareEventTemplates } from '../../utils/helper';
import * as fromTemplate from './template.reducer';

export const templateStateSelector = createFeatureSelector<fromTemplate.TemplateState>(
  fromTemplate.templateFeatureKey
);

export const templateSelector = createSelector(
  templateStateSelector,
  templateState => templateState.template
)

export const templateProcessingSelector = createSelector(
  templateStateSelector,
  templateState => templateState.processing
)

export const eventTemplatesSelector = createSelector(
  templatesStateSelector,
  templateStateSelector,
  (templatesState, templateState) => templatesState.templates
    .flatMap(template => template.eventTemplates)
    .filter((eventTemplate, i, allEventTemplates) => (
      i === allEventTemplates.findIndex(item => deepCompareEventTemplates(item, eventTemplate)) &&
      (!templateState.template?.eventTemplates?.length || !templateState.template.eventTemplates.find(item => deepCompareEventTemplates(item, eventTemplate)))
    ))
)