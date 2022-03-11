import { settingsReducer, initialState } from './setting.reducer';

describe('Setting Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = settingsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
