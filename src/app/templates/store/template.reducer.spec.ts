import * as LazyTemplateActions from './template.actions';
import * as TemplateActions  from '../../store/template.actions';
import { templateReducer, initialTemplateState } from './template.reducer';
import { Template } from '../../models';

const templateTemplate: Template = new Template('', '');
const errorTemplate = {}


describe('Template Reducer', () => {
  describe('Load Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.loadTemplate({ id : templateTemplate.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.loadTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.loadTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.updateTemplate({ template : templateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, TemplateActions.updateTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.updateTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.createTemplate({ title: '', desc: '' }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, TemplateActions.createTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.createTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.deleteTemplate({ template : templateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = templateReducer(initialTemplateState, TemplateActions.deleteTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(null);
    });
    
    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, LazyTemplateActions.deleteTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
