import { v4 as uuid } from 'uuid';
import * as LazyLogActions from './log.actions';
import * as LogActions from '../../store/log.actions';
import { logReducer, initialLogState } from './log.reducer';
import { Log } from '../../models';

const log: Log = new Log(uuid(), '', '');
const errorTemplate = {}

describe('Log Reducer', () => {
  describe('Load Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, LazyLogActions.loadLog({ id : log.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, LazyLogActions.loadLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, LazyLogActions.loadLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, LazyLogActions.updateLog({ log : log }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, LogActions.updateLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, LazyLogActions.updateLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, LazyLogActions.createLog({ templateId : log.templateId, title: log.title, desc: log.desc }));
      expect(newState.processing).toBe(true);
    });

    it('should return the log', () => {
      const newState = logReducer(initialLogState, LogActions.createLogSuccess({ log : log }));
      expect(newState.log).toBe(log);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, LazyLogActions.createLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Log action', () => {
    it('should enable the processing flag', () => {
      const newState = logReducer(initialLogState, LazyLogActions.deleteLog({ log : log }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = logReducer(initialLogState, LogActions.deleteLogSuccess({ log : log }));
      expect(newState.log).toBe(null);
    });

    it('should return the error', () => {
      const newState = logReducer(initialLogState, LazyLogActions.deleteLogFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
