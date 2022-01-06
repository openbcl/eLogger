import * as fromLog from './log.reducer';
import { logsStateSelector, logsSelector, logsProcessingSelector, logStateSelector, logSelector, logProcessingSelector } from './log.selectors';

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
    expect(result).toEqual(null!);
  });

  it('should select the initial processing status', () => {
    const result = logProcessingSelector({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(false);
  });
});
