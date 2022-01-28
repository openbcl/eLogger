import { createLogTemplate, deleteLogTemplate, loadLogTemplate, loadLogTemplates, loadLogTemplateSuccess, loadLogTemplateFailure, updateLogTemplate, loadLogTemplatesSuccess, loadLogTemplatesFailure, updateLogTemplateSuccess, createLogTemplateSuccess, deleteLogTemplateSuccess, updateLogTemplateFailure, createLogTemplateFailure, deleteLogTemplateFailure } from './logtemplate.actions';
import { logTemplatesReducer, logTemplateReducer, initialLogTemplatesState, initialLogTemplateState } from './logtemplate.reducer';
import { LogTemplate } from '../../shared/models';

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

  describe('Update LogTemplate action', () => {
    it('should return the logTemplates', () => {
      const newState = logTemplatesReducer({ ...initialLogTemplatesState, logTemplates: [ logTemplateTemplate ] }, updateLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplates.length).toBe(1);
    });
  });

  describe('Create LogTemplate action', () => {
    it('should return the logTemplates', () => {
      const newState = logTemplatesReducer(initialLogTemplatesState, createLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplates.length).toBe(1);
    });
  });

  describe('Delete LogTemplate action', () => {
    it('should return the logTemplates', () => {
      const newState = logTemplatesReducer({ ...initialLogTemplatesState, logTemplates: [ logTemplateTemplate ] }, deleteLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplates.length).toBe(0);
    });
  });
});


describe('LogTemplate Reducer', () => {
  describe('Load LogTemplate action', () => {
    it('should enable the processing flag', () => {
      const newState = logTemplateReducer(initialLogTemplateState, loadLogTemplate({ id : logTemplateTemplate.id }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logTemplate', () => {
      const newState = logTemplateReducer(initialLogTemplateState, loadLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplate).toBe(logTemplateTemplate);
    });

    it('should return the error', () => {
      const newState = logTemplateReducer(initialLogTemplateState, loadLogTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Update LogTemplate action', () => {
    it('should enable the processing flag', () => {
      const newState = logTemplateReducer(initialLogTemplateState, updateLogTemplate({ logTemplate : logTemplateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logTemplate', () => {
      const newState = logTemplateReducer(initialLogTemplateState, updateLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplate).toBe(logTemplateTemplate);
    });

    it('should return the error', () => {
      const newState = logTemplateReducer(initialLogTemplateState, updateLogTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Create LogTemplate action', () => {
    it('should enable the processing flag', () => {
      const newState = logTemplateReducer(initialLogTemplateState, createLogTemplate({ title: '' }));
      expect(newState.processing).toBe(true);
    });

    it('should return the logTemplate', () => {
      const newState = logTemplateReducer(initialLogTemplateState, createLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplate).toBe(logTemplateTemplate);
    });

    it('should return the error', () => {
      const newState = logTemplateReducer(initialLogTemplateState, createLogTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });

  describe('Delete LogTemplate action', () => {
    it('should enable the processing flag', () => {
      const newState = logTemplateReducer(initialLogTemplateState, deleteLogTemplate({ logTemplate : logTemplateTemplate }));
      expect(newState.processing).toBe(true);
    });

    it('should return null', () => {
      const newState = logTemplateReducer(initialLogTemplateState, deleteLogTemplateSuccess({ logTemplate : logTemplateTemplate }));
      expect(newState.logTemplate).toBe(null);
    });

    it('should return the error', () => {
      const newState = logTemplateReducer(initialLogTemplateState, deleteLogTemplateFailure({ error : errorTemplate }));
      expect(newState.error).toBe(errorTemplate);
    });
  });
});
