import * as fromLogType from './logtype.reducer';
import { logTypesStateSelector, logTypesSelector, logTypesProcessingSelector, logTypeStateSelector, logTypeSelector, logTypeProcessingSelector } from './logtype.selectors';

describe('LogTypes Selectors', () => {
  it('should select the initial logTypes state', () => {
    const result = logTypesStateSelector({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual(fromLogType.initialLogTypesState);
  });

  it('should select the initial logTypes', () => {
    const result = logTypesSelector({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = logTypesProcessingSelector({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual(false);
  });
});

describe('LogType Selectors', () => {
  it('should select the initial logType state', () => {
    const result = logTypeStateSelector({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(fromLogType.initialLogTypeState);
  });

  it('should select the initial logType', () => {
    const result = logTypeSelector({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(null);
  });

  it('should select the initial processing status', () => {
    const result = logTypeProcessingSelector({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(false);
  });
});
