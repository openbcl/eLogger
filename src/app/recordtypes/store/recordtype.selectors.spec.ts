import * as fromRecordtype from './recordtype.reducer';
import { selectRecordtypeState } from './recordtype.selectors';

describe('Recordtype Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRecordtypeState({
      [fromRecordtype.recordtypeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
