import * as fromTemplate from './template.reducer';
import { templatesStateSelector, templatesSelector, templatesProcessingSelector } from './template.selectors';

describe('Templates Selectors', () => {
  it('should select the initial templates state', () => {
    const result = templatesStateSelector({
      [fromTemplate.templatesFeatureKey]: fromTemplate.initialTemplatesState
    });
    expect(result).toEqual(fromTemplate.initialTemplatesState);
  });

  it('should select the initial templates', () => {
    const result = templatesSelector({
      [fromTemplate.templatesFeatureKey]: fromTemplate.initialTemplatesState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = templatesProcessingSelector({
      [fromTemplate.templatesFeatureKey]: fromTemplate.initialTemplatesState
    });
    expect(result).toEqual(false);
  });
});