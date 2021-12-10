import { v4 as uuid } from 'uuid';
import { createLog, deleteLog, loadLog, loadLogs, loadLogSuccess, loadLogFailure, updateLog, loadLogsSuccess, loadLogsFailure, updateLogSuccess, createLogSuccess, deleteLogSuccess, updateLogFailure, createLogFailure, deleteLogFailure } from './log.actions';
import { logsReducer, logReducer, initialLogsState, initialLogState } from './log.reducer';
import { Log } from '../../shared/models';

const logTemplate: Log = new Log(uuid());
const errorTemplate = {}

describe('Logs Reducer', () => {
  describe('Load Logs action', () => {
    it('should enable the processing flag', () => {
      const newState = logsReducer(initialLogsState, loadLogs());
      expect(newState.processing).toBe(true);
    });

    it('should return the logs', () => {
      const newState = logsReducer(initialLogsState, loadLogsSuccess({ logs : [ logTemplate ] }));
      expect(newState.logs.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = logsReducer(initialLogsState, loadLogsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer({ ...initialLogsState, logs: [ logTemplate ] }, updateLogSuccess({ log : logTemplate }));
      expect(newState.logs.length).toBe(1);
    });
  });

  describe('Create Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer(initialLogsState, createLogSuccess({ log : logTemplate }));
      expect(newState.logs.length).toBe(1);
    });
  });

  describe('Delete Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer({ ...initialLogsState, logs: [ logTemplate ] }, deleteLogSuccess({ log : logTemplate }));
      expect(newState.logs.length).toBe(0);
    });
  });
});


describe('Log Reducer', () => {
  describe('Load Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, loadLog({ id : logTemplate.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, loadLogSuccess({ log : logTemplate }));
      expect(newState.log).toBe(logTemplate);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, loadLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, updateLog({ log : logTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, updateLogSuccess({ log : logTemplate }));
      expect(newState.log).toBe(logTemplate);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, updateLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, createLog({ log : logTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, createLogSuccess({ log : logTemplate }));
      expect(newState.log).toBe(logTemplate);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, createLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, deleteLog({ log : logTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = logReducer(initialLogState, deleteLogSuccess({ log : logTemplate }));
      expect(newState.log).toBe(null!);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, deleteLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
