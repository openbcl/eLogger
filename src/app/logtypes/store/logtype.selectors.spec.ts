import * as fromLogType from './logtype.reducer';
import { selectLogTypesState, selectLogTypes, selectLogTypesProcessing, selectLogTypeState, selectLogType, selectLogTypeProcessing } from './logtype.selectors';

describe('LogTypes Selectors', () => {
  it('should select the initial logTypes state', () => {
    const result = selectLogTypesState({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual(fromLogType.initialLogTypesState);
  });

  it('should select the initial logTypes', () => {
    const result = selectLogTypes({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = selectLogTypesProcessing({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual(false);
  });
});

describe('LogType Selectors', () => {
  it('should select the initial logType state', () => {
    const result = selectLogTypeState({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(fromLogType.initialLogTypeState);
  });

  it('should select the initial logType', () => {
    const result = selectLogType({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(null!);
  });

  it('should select the initial processing status', () => {
    const result = selectLogTypeProcessing({
      [fromLogType.logTypeFeatureKey]: fromLogType.initialLogTypeState
    });
    expect(result).toEqual(false);
  });
});
