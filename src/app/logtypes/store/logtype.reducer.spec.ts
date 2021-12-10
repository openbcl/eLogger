import { createLogType, deleteLogType, loadLogType, loadLogTypes, loadLogTypeSuccess, loadLogTypeFailure, updateLogType, loadLogTypesSuccess, loadLogTypesFailure, updateLogTypeSuccess, createLogTypeSuccess, deleteLogTypeSuccess, updateLogTypeFailure, createLogTypeFailure, deleteLogTypeFailure } from './logtype.actions';
import { logTypesReducer, logTypeReducer, initialLogTypesState, initialLogTypeState } from './logtype.reducer';
import { LogType } from '../../shared/models';

const logTypeTemplate: LogType = new LogType();
const errorTemplate = {}

describe('LogTypes Reducer', () => {
  describe('Load LogTypes action', () => {
    it('should enable the processing flag', () => {
      const newState = logTypesReducer(initialLogTypesState, loadLogTypes());
      expect(newState.processing).toBe(true);
    });

    it('should return the logTypes', () => {
      const newState = logTypesReducer(initialLogTypesState, loadLogTypesSuccess({ logTypes : [ logTypeTemplate ] }));
      expect(newState.logTypes.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = logTypesReducer(initialLogTypesState, loadLogTypesFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update LogType action', () => {
    it('should return the logTypes', () => {
      const newState = logTypesReducer({ ...initialLogTypesState, logTypes: [ logTypeTemplate ] }, updateLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logTypes.length).toBe(1);
    });
  });

  describe('Create LogType action', () => {
    it('should return the logTypes', () => {
      const newState = logTypesReducer(initialLogTypesState, createLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logTypes.length).toBe(1);
    });
  });

  describe('Delete LogType action', () => {
    it('should return the logTypes', () => {
      const newState = logTypesReducer({ ...initialLogTypesState, logTypes: [ logTypeTemplate ] }, deleteLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logTypes.length).toBe(0);
    });
  });
});


describe('LogType Reducer', () => {
  describe('Load LogType action', () => {
    it('should enable the processing flag', () => {
      const newState = logTypeReducer(initialLogTypeState, loadLogType({ id : logTypeTemplate.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logType', () => {
      const newState = logTypeReducer(initialLogTypeState, loadLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logType).toBe(logTypeTemplate);
    });

    it('should return the error', () => {
      const newState = logTypeReducer(initialLogTypeState, loadLogTypeFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update LogType action', () => {
    it('should enable the processing flag', () => {
      const newState = logTypeReducer(initialLogTypeState, updateLogType({ logType : logTypeTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logType', () => {
      const newState = logTypeReducer(initialLogTypeState, updateLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logType).toBe(logTypeTemplate);
    });

    it('should return the error', () => {
      const newState = logTypeReducer(initialLogTypeState, updateLogTypeFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create LogType action', () => {
    it('should enable the processing flag', () => {
      const newState = logTypeReducer(initialLogTypeState, createLogType({ logType : logTypeTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logType', () => {
      const newState = logTypeReducer(initialLogTypeState, createLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logType).toBe(logTypeTemplate);
    });

    it('should return the error', () => {
      const newState = logTypeReducer(initialLogTypeState, createLogTypeFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete LogType action', () => {
    it('should enable the processing flag', () => {
      const newState = logTypeReducer(initialLogTypeState, deleteLogType({ logType : logTypeTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = logTypeReducer(initialLogTypeState, deleteLogTypeSuccess({ logType : logTypeTemplate }));
      expect(newState.logType).toBe(null!);
    });

    it('should return the error', () => {
      const newState = logTypeReducer(initialLogTypeState, deleteLogTypeFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
