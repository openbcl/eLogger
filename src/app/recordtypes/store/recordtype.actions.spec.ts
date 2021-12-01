import * as fromRecordtype from './recordtype.actions';

describe('loadRecordtypes', () => {
  it('should return an action', () => {
    expect(fromRecordtype.loadRecordtypes().type).toBe('[Recordtype] Load Recordtypes');
  });
});
