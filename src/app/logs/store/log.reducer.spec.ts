import { v4 as uuid } from 'uuid';
import { createLog, deleteLog, loadLog, loadLogs, loadLogSuccess, loadLogFailure, updateLog, loadLogsSuccess, loadLogsFailure, updateLogSuccess, createLogSuccess, deleteLogSuccess, updateLogFailure, createLogFailure, deleteLogFailure } from './log.actions';
import { logsReducer, logReducer, initialLogsState, initialLogState } from './log.reducer';
import { Log } from '../../shared/models';

const log: Log = new Log(uuid());
const errorTemplate = {}

describe('Logs Reducer', () => {
  describe('Load Logs action', () => {
    it('should enable the processing flag', () => {
      const newState = logsReducer(initialLogsState, loadLogs());
      expect(newState.processing).toBe(true);
    });

    it('should return the logs', () => {
      const newState = logsReducer(initialLogsState, loadLogsSuccess({ logs : [ log ] }));
      expect(newState.logs.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = logsReducer(initialLogsState, loadLogsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer({ ...initialLogsState, logs: [ log ] }, updateLogSuccess({ log : log }));
      expect(newState.logs.length).toBe(1);
    });
  });

  describe('Create Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer(initialLogsState, createLogSuccess({ log : log }));
      expect(newState.logs.length).toBe(1);
    });
  });

  describe('Delete Log action', () => {
    it('should return the logs', () => {
      const newState = logsReducer({ ...initialLogsState, logs: [ log ] }, deleteLogSuccess({ log : log }));
      expect(newState.logs.length).toBe(0);
    });
  });
});


describe('Log Reducer', () => {
  describe('Load Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, loadLog({ id : log.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, loadLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, loadLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, updateLog({ log : log }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, updateLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, updateLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, createLog({ log : log }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, createLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, createLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, deleteLog({ log : log }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = logReducer(initialLogState, deleteLogSuccess({ log : log }));
      expect(newState.log).toBe(null);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, deleteLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
