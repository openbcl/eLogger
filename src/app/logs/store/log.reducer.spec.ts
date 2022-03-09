import { v4 as uuid } from 'uuid';
import { createLog, deleteLog, loadLog, loadLogSuccess, loadLogFailure, updateLog, updateLogFailure, createLogFailure, deleteLogFailure } from './log.actions';
import { updateLogSuccess, createLogSuccess, deleteLogSuccess } from '../../store/log.actions';
import { logReducer, initialLogState } from './log.reducer';
import { Log } from '../../shared/models';

const log: Log = new Log(uuid(), '', '');
const errorTemplate = {}

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
      const newState = logReducer(initialLogState, createLog({ logTemplateId : log.logTemplateId, title: log.title, desc: log.desc }));
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
