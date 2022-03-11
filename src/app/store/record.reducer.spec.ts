import * as RecordActions from './record.actions';
import { recordsReducer, initialRecordsState } from './record.reducer';
import { Record } from '../models';

const record: Record = new Record({ name: null, color: null, eventType: 0, icon: null }, null, null);
const errorTemplate = {}

describe('Records Reducer', () => {
  describe('Load Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadRecords({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return the records', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadRecordsSuccess({ records : [ record ] }));
      expect(newState.records?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load All Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadAllRecords());
      expect(newState.processing).toBe(true);
    });

    it('should return the records', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadAllRecordsSuccess({ records : [ record ] }));
      expect(newState.records?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.loadAllRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Count Total Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.countTotalRecords());
      expect(newState.processing).toBe(true);
    });

    it('should return the count', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.countTotalRecordsSuccess({ total : 5 }));
      expect(newState.total).toBe(5);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.countTotalRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Record action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.createRecord({ eventTemplate : null, logId: null, date: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return the record', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.createRecordSuccess({ record : record }));
      expect(newState.records).toContain(record);
      expect(newState.total).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.createRecordFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Revoke Record action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.revokeRecord({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return less records', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.revokeRecordSuccess({ logId : null }));
      expect(newState.records).not.toContain(record);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.revokeRecordFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.deleteRecords({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return no records', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.deleteRecordsSuccess({ logId : null }));
      expect(newState.records).toHaveSize(0);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, RecordActions.deleteRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});