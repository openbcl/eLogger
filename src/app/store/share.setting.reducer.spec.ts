import * as ShareAction from './share.actions';
import { shareReducer, initialShareState } from './share.reducer';

const errorTemplate = {}

describe('Share Reducer', () => {
  describe('Download Logs action', () => {
    it('should return true', () => {
      const newState = shareReducer(initialShareState, ShareAction.shareLogs({ logs: [], templates: []}));
      expect(newState.processing).toBe(true);
    });
    it('should return true', () => {
      const newState = shareReducer(initialShareState, ShareAction.shareRecords({ records: [], log: null }));
      expect(newState.processing).toBe(true);
    });

    it('should return false', () => {
      const newState = shareReducer(initialShareState, ShareAction.shareSuccess());
      expect(newState.processing).toBe(false);
    });

    it('should return the error', () => {
      const newState = shareReducer(initialShareState, ShareAction.shareFailure({ error: errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
