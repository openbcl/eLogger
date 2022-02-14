import { v4 as uuid } from 'uuid';
import { loadLogs, loadLogsSuccess, loadLogsFailure } from './log.actions';
import { logsReducer, initialLogsState } from './log.reducer';
import { Log } from '../shared/models';

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
});