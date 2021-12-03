import * as fromLogtype from './logtype.actions';

describe('loadLogtypes', () => {
  it('should return an action', () => {
    expect(fromLogtype.loadLogtypes().type).toBe('[Logtype] Load Logtypes');
  });
});
