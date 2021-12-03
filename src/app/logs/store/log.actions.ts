import { createAction, props } from '@ngrx/store';

export const loadLogs = createAction(
  '[Log] Load Logs'
);

export const loadLogsSuccess = createAction(
  '[Log] Load Logs Success',
  props<{ data: any }>()
);

export const loadLogsFailure = createAction(
  '[Log] Load Logs Failure',
  props<{ error: any }>()
);
