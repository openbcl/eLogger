import * as TemplateActions from './template.actions';
import { templatesReducer, initialTemplatesState } from './template.reducer';
import { Template } from '../models';

const templateTemplate: Template = new Template('', '');
const errorTemplate = {}

describe('Templates Reducer', () => {
  describe('Load Templates action', () => {
    it('should enable the processing flag', () => {
      const newState = templatesReducer(initialTemplatesState, TemplateActions.loadTemplates());
      expect(newState.processing).toBe(true);
    });

    it('should return the templates', () => {
      const newState = templatesReducer(initialTemplatesState, TemplateActions.loadTemplatesSuccess({ templates : [ templateTemplate ] }));
      expect(newState.templates?.length).toBe(1);
    });

    it('should return the error', () => {
      const newState = templatesReducer(initialTemplatesState, TemplateActions.loadTemplatesFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});