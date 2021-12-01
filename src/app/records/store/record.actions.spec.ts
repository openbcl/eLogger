import * as fromRecord from './record.actions';

describe('loadRecords', () => {
  it('should return an action', () => {
    expect(fromRecord.loadRecords().type).toBe('[Record] Load Records');
  });
});
