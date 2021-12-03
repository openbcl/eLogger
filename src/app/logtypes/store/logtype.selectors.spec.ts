import * as fromLogType from './logtype.reducer';
import { selectLogTypeState } from './logtype.selectors';

describe('LogType Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLogTypeState({
      [fromLogType.logTypesFeatureKey]: fromLogType.initialLogTypesState
    });
    expect(result).toEqual(fromLogType.initialLogTypesState);
  });
});
