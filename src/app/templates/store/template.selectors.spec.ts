import * as fromTemplate from './template.reducer';
import * as fromTemplates from '../../store/template.reducer';
import { templateStateSelector, templateSelector, templateProcessingSelector, eventTemplatesSelector } from './template.selectors';

describe('Template Selectors', () => {
  it('should select the initial template state', () => {
    const result = templateStateSelector({
      [fromTemplate.templateFeatureKey]: fromTemplate.initialTemplateState
    });
    expect(result).toEqual(fromTemplate.initialTemplateState);
  });

  it('should select the initial template', () => {
    const result = templateSelector({
      [fromTemplate.templateFeatureKey]: fromTemplate.initialTemplateState
    });
    expect(result).toEqual(null);
  });

  it('should select the initial processing status', () => {
    const result = templateProcessingSelector({
      [fromTemplate.templateFeatureKey]: fromTemplate.initialTemplateState
    });
    expect(result).toEqual(false);
  });

  it('should select selectable event templates', () => {
    const result = eventTemplatesSelector({
      [fromTemplates.templatesFeatureKey]: fromTemplates.initialTemplatesState,
      [fromTemplate.templateFeatureKey]: fromTemplate.initialTemplateState
    });
    expect(result).toEqual([]);
  });
});
