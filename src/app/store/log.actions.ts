import { createAction, props } from '@ngrx/store';
import { Log } from '../models';

export const loadLogs = createAction(
  '[Log] Load Logs'
);

export const loadLogsFailure = createAction(
  '[Log] Load Logs Failure',
  props<{ error: any }>()
);

export const loadLogsSuccess = createAction(
  '[Log] Load Logs Success',
  props<{ logs: Log[] }>()
);

export const createLogSuccess = createAction(
  '[Log] Create Log Success',
  props<{ log: Log }>()
);
      
export const updateLogSuccess = createAction(
  '[Log] Update Log Success',
  props<{ log: Log }>()
);

export const deleteLogSuccess = createAction(
  '[Log] Delete Log Success',
  props<{ log: Log }>()
);

export const reorderLogs = createAction(
  '[Log] Reorder Logs',
  props<{ logs: Log[] }>()
);

export const reorderLogsSuccess = createAction(
  '[Log] Reorder Logs Success',
  props<{ logs: Log[] }>()
);

export const reorderLogsFailure = createAction(
  '[Log] Reorder Logs Failure',
  props<{ error: any }>()
);

export const patchLogs = createAction(
  '[Log] Patch Logs',
  props<{ logs: Partial<Log>[] }>()
);

export const patchLogsFailure = createAction(
  '[Log] Patch Logs Failure',
  props<{ error: any }>()
);
  
export const patchLogsSuccess = createAction(
  '[Log] Patch Logs Success',
  props<{ logs: Log[] }>()
);