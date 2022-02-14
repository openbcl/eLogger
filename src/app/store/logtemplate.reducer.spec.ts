import { loadLogTemplates, loadLogTemplatesSuccess, loadLogTemplatesFailure } from './logtemplate.actions';
import { logTemplatesReducer, initialLogTemplatesState } from './logtemplate.reducer';
import { LogTemplate } from '../shared/models';

const logTemplateTemplate: LogTemplate = new LogTemplate('');
const errorTemplate = {}

describe('LogTemplates Reducer', () => {
  describe('Load LogTemplates action', () => {
    it('should enable the processing flag', () => {
      const newState = logTemplatesReducer(initialLogTemplatesState, loadLogTemplates());
      expect(newState.processing).toBe(true);
    });

    it('should return the logTemplates', () => {
      const newState = logTemplatesReducer(initialLogTemplatesState, loadLogTemplatesSuccess({ logTemplates : [ logTemplateTemplate ] }));
      expect(newState.logTemplates.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = logTemplatesReducer(initialLogTemplatesState, loadLogTemplatesFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});