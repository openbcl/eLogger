import * as fromRecord from './record.reducer';
import { selectRecordState } from './record.selectors';

describe('Record Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRecordState({
      [fromRecord.recordFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
