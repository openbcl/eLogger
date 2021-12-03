import * as fromLog from './log.actions';

describe('loadLogs', () => {
  it('should return an action', () => {
    expect(fromLog.loadLogs().type).toBe('[Log] Load Logs');
  });
});
