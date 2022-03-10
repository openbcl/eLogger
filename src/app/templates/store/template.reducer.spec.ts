import { createTemplate, deleteTemplate, loadTemplate, loadTemplateSuccess, loadTemplateFailure, updateTemplate, updateTemplateFailure, createTemplateFailure, deleteTemplateFailure } from './template.actions';
import { createTemplateSuccess, deleteTemplateSuccess, updateTemplateSuccess } from '../../store/template.actions';
import { templateReducer, initialTemplateState } from './template.reducer';
import { Template } from '../../shared/models';

const templateTemplate: Template = new Template('', '');
const errorTemplate = {}


describe('Template Reducer', () => {
  describe('Load Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, loadTemplate({ id : templateTemplate.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, loadTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, loadTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, updateTemplate({ template : templateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, updateTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, updateTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, createTemplate({ title: '', desc: '' }));
      expect(newState.processing).toBe(true);
    });

    it('should return the template', () => {
      const newState = templateReducer(initialTemplateState, createTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(templateTemplate);
    });

    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, createTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete Template action', () => {
    it('should enable the processing flag', () => {
      const newState = templateReducer(initialTemplateState, deleteTemplate({ template : templateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = templateReducer(initialTemplateState, deleteTemplateSuccess({ template : templateTemplate }));
      expect(newState.template).toBe(null);
    });
    
    it('should return the error', () => {
      const newState = templateReducer(initialTemplateState, deleteTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
