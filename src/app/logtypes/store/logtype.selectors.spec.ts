import * as fromLogtype from './logtype.reducer';
import { selectLogtypeState } from './logtype.selectors';

describe('Logtype Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLogtypeState({
      [fromLogtype.logtypeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
