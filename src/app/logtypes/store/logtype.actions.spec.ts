import * as fromLogType from './logtype.actions';

describe('loadLogTypes', () => {
  it('should return an action', () => {
    expect(fromLogType.loadLogTypes().type).toBe('[LogType] Load LogTypes');
  });
});
