import * as fromShare from './share.reducer';
import { shareStateSelector, downloadingSelector } from './share.selectors';

describe('Share Selectors', () => {
  it('should select the initial feature state', () => {
    const result = shareStateSelector({
      [fromShare.shareFeatureKey]: fromShare.initialShareState
    });
    expect(result).toEqual(fromShare.initialShareState);
  });
  it('should select the initial processing state', () => {
    const result = downloadingSelector({
      [fromShare.shareFeatureKey]: fromShare.initialShareState
    });
    expect(result).toEqual(fromShare.initialShareState.processing);
  });
});
