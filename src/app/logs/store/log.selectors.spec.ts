import * as fromLog from './log.reducer';
import { selectLogsState, selectLogs, selectLogsProcessing, selectLogState, selectLog, selectLogProcessing } from './log.selectors';

describe('Logs Selectors', () => {
  it('should select the initial logs state', () => {
    const result = selectLogsState({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual(fromLog.initialLogsState);
  });

  it('should select the initial logs', () => {
    const result = selectLogs({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual([]);
  });

  it('should select the initial processing status', () => {
    const result = selectLogsProcessing({
      [fromLog.logsFeatureKey]: fromLog.initialLogsState
    });
    expect(result).toEqual(false);
  });
});

describe('Log Selectors', () => {
  it('should select the initial log state', () => {
    const result = selectLogState({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(fromLog.initialLogState);
  });

  it('should select the initial log', () => {
    const result = selectLog({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(null!);
  });

  it('should select the initial processing status', () => {
    const result = selectLogProcessing({
      [fromLog.logFeatureKey]: fromLog.initialLogState
    });
    expect(result).toEqual(false);
  });
});
