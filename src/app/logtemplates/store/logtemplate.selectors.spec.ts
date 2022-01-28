import * as fromLogTemplate from './logtemplate.reducer';
import { logTemplatesStateSelector, logTemplatesSelector, logTemplatesProcessingSelector, logTemplateStateSelector, logTemplateSelector, logTemplateProcessingSelector } from './logtemplate.selectors';

describe('LogTemplates Selectors', () => {
  it('should select the initial logTemplates state', () => {
    const result = logTemplatesStateSelector({
      [fromLogTemplate.logTemplatesFeatureKey]: fromLogTemplate.initialLogTemplatesState
    });
    expect(result).toEqual(fromLogTemplate.initialLogTemplatesState);
  });

  it('should select the initial logTemplates', () => {
    const result = logTemplatesSelector({
      [fromLogTemplate.logTemplatesFeatureKey]: fromLogTemplate.initialLogTemplatesState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = logTemplatesProcessingSelector({
      [fromLogTemplate.logTemplatesFeatureKey]: fromLogTemplate.initialLogTemplatesState
    });
    expect(result).toEqual(false);
  });
});

describe('LogTemplate Selectors', () => {
  it('should select the initial logTemplate state', () => {
    const result = logTemplateStateSelector({
      [fromLogTemplate.logTemplateFeatureKey]: fromLogTemplate.initialLogTemplateState
    });
    expect(result).toEqual(fromLogTemplate.initialLogTemplateState);
  });

  it('should select the initial logTemplate', () => {
    const result = logTemplateSelector({
      [fromLogTemplate.logTemplateFeatureKey]: fromLogTemplate.initialLogTemplateState
    });
    expect(result).toEqual(null);
  });

  it('should select the initial processing status', () => {
    const result = logTemplateProcessingSelector({
      [fromLogTemplate.logTemplateFeatureKey]: fromLogTemplate.initialLogTemplateState
    });
    expect(result).toEqual(false);
  });
});
