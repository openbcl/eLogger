import * as fromRecord from './record.reducer';
import { recordsStateSelector, recordsSelector, recordsProcessingSelector, recordsCountSelector, allRecordsSelector, totalRecordsSelector, allRecordsCountSelector } from './record.selectors';

describe('Records Selectors', () => {
  it('should select the initial records state', () => {
    const result = recordsStateSelector({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    });
    expect(result).toEqual(fromRecord.initialRecordsState);
  });

  it('should select the initial processing status', () => {
    const result = recordsProcessingSelector({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    });
    expect(result).toEqual(false);
  });

  it('should select the initial records of a log', () => {
    const result = recordsSelector('')({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    })
    expect(result).toEqual([]);
  });

  it('should select the count of records of a log', () => {
    const result = recordsCountSelector('')({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    })
    expect(result).toEqual(0);
  });

  it('should select all records', () => {
    const result = allRecordsSelector({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    })
    expect(result).toEqual({});
  });

  it('should select the count of records for each log', () => {
    const result = allRecordsCountSelector({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    })
    expect(result).toEqual({});
  });

  it('should select the total of records', () => {
    const result = totalRecordsSelector({
      [fromRecord.recordsFeatureKey]: fromRecord.initialRecordsState
    })
    expect(result).toEqual(0);
  });
});