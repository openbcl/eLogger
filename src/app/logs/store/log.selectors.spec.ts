import * as fromLog from './log.reducer';
import { logStateSelector, logSelector, logProcessingSelector } from './log.selectors';

describe('Log Selectors', () => {
  it('should select the initial log state', () => {
    const result = logStateSelector({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(fromLog.initialLogState);
  });

  it('should select the initial log', () => {
    const result = logSelector({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(null);
  });

  it('should select the initial processing status', () => {
    const result = logProcessingSelector({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(false);
  });
});
