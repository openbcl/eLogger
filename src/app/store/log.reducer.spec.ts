import * as LogActions from './log.actions';
import { logsReducer, initialLogsState } from './log.reducer';
import { Log } from '../models';

const log: Log = new Log(null, null, null);
const errorTemplate = {}

describe('Logs Reducer', () => {
  describe('Load Logs action', () => {
    it('should enable the processing flag', () => {
      const newState = logsReducer(initialLogsState, LogActions.loadLogs());
      expect(newState.processing).toBe(true);
    });

    it('should return the logs', () => {
      const newState = logsReducer(initialLogsState, LogActions.loadLogsSuccess({ logs : [ log ] }));
      expect(newState.logs?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = logsReducer(initialLogsState, LogActions.loadLogsFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});