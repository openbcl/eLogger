import * as fromLog from './log.reducer';
import { logsStateSelector, logsSelector, logsProcessingSelector } from './log.selectors';

describe('Logs Selectors', () => {
  it('should select the initial logs state', () => {
    const result = logsStateSelector({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual(fromLog.initialLogsState);
  });

  it('should select the initial logs', () => {
    const result = logsSelector({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = logsProcessingSelector({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual(false);
  });
});