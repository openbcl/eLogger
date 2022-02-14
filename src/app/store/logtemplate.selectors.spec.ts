import * as fromLogTemplate from './logtemplate.reducer';
import { logTemplatesStateSelector, logTemplatesSelector, logTemplatesProcessingSelector } from './logtemplate.selectors';

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