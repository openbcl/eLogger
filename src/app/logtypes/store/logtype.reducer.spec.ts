import { loadLogTypes } from './logtype.actions';
import { loadLogTypesReducer, initialLogTypesState } from './logtype.reducer';

describe('LogType Reducer', () => {
  describe('Load LogTypes action', () => {
    it('should enable the processing flag', () => {
      const newState = loadLogTypesReducer(initialLogTypesState, loadLogTypes());
      expect(newState.processing).toBe(true);
    });
  });
});
