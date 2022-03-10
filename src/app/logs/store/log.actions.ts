import { createAction, props } from '@ngrx/store';
import { Log } from '../../models';

export const loadLog = createAction(
  '[Log] Load Log',
  props<{ id?: string }>()
);

export const loadLogSuccess = createAction(
  '[Log] Load Log Success',
  props<{ log: Log }>()
);

export const loadLogFailure = createAction(
  '[Log] Load Log Failure',
  props<{ error: any }>()
);

export const createLog = createAction(
  '[Log] Create Log',
  props<{ templateId: string, title: string, desc: string }>()
);

export const createLogFailure = createAction(
  '[Log] Create Log Failure',
  props<{ error: any }>()
);

export const updateLog = createAction(
  '[Log] Update Log',
  props<{ log: Log }>()
);


export const updateLogFailure = createAction(
  '[Log] Update Log Failure',
  props<{ error: any }>()
);
  
export const deleteLog = createAction(
  '[Log] Delete Log',
  props<{ log: Log }>()
);
  
  
export const deleteLogFailure = createAction(
  '[Log] Delete Log Failure',
  props<{ error: any }>()
);