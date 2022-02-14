import * as fromLogTemplate from './logtemplate.reducer';
import * as fromLogTemplates from '../../store/logtemplate.reducer';
import { logTemplateStateSelector, logTemplateSelector, logTemplateProcessingSelector, eventTemplatesSelector } from './logtemplate.selectors';

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

  it('should select selectable event templates', () => {
    const result = eventTemplatesSelector({
      [fromLogTemplates.logTemplatesFeatureKey]: fromLogTemplates.initialLogTemplatesState,
      [fromLogTemplate.logTemplateFeatureKey]: fromLogTemplate.initialLogTemplateState
    });
    expect(result).toEqual([]);
  });
});
