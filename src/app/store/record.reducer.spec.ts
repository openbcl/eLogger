import { loadRecords, loadRecordsSuccess, loadRecordsFailure, createRecord, createRecordSuccess, createRecordFailure, revokeRecord, revokeRecordSuccess, revokeRecordFailure, deleteRecords, deleteRecordsSuccess, deleteRecordsFailure, loadAllRecords, loadAllRecordsSuccess, loadAllRecordsFailure, countTotalRecords, countTotalRecordsSuccess, countTotalRecordsFailure } from './record.actions';
import { recordsReducer, initialRecordsState } from './record.reducer';
import { Record } from '../shared/models';

const record: Record = new Record({ name: null, color: null, eventType: 0, icon: null }, null, null);
const errorTemplate = {}

describe('Records Reducer', () => {
  describe('Load Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, loadRecords({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return the records', () => {
      const newState = recordsReducer(initialRecordsState, loadRecordsSuccess({ records : [ record ] }));
      expect(newState.records?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, loadRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Load All Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, loadAllRecords());
      expect(newState.processing).toBe(true);
    });

    it('should return the records', () => {
      const newState = recordsReducer(initialRecordsState, loadAllRecordsSuccess({ records : [ record ] }));
      expect(newState.records?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, loadAllRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Count Total Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, countTotalRecords());
      expect(newState.processing).toBe(true);
    });

    it('should return the count', () => {
      const newState = recordsReducer(initialRecordsState, countTotalRecordsSuccess({ total : 5 }));
      expect(newState.total).toBe(5);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, countTotalRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Record action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, createRecord({ eventTemplate : null, logId: null, date: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return the record', () => {
      const newState = recordsReducer(initialRecordsState, createRecordSuccess({ record : record }));
      expect(newState.records).toContain(record);
      expect(newState.total).toBe(1);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, createRecordFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Revoke Record action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, revokeRecord({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return less records', () => {
      const newState = recordsReducer(initialRecordsState, revokeRecordSuccess({ logId : null }));
      expect(newState.records).not.toContain(record);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, revokeRecordFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Records action', () => {
    it('should enable the processing flag', () => {
      const newState = recordsReducer(initialRecordsState, deleteRecords({ logId: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return no records', () => {
      const newState = recordsReducer(initialRecordsState, deleteRecordsSuccess({ logId : null }));
      expect(newState.records).toHaveSize(0);
    });

    it('should return the error', () => {
      const newState = recordsReducer(initialRecordsState, deleteRecordsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});