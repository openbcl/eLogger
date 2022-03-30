import { createAction, props } from '@ngrx/store';
import { Log, Template, Record } from '../models';

export const shareRecords = createAction(
  '[Share] Download Records',
  props<{ records: Record[], log: Log }>()
);

export const shareLogs = createAction(
  '[Share] Download Logs',
  props<{ logs: Log[], templates: Template[] }>()
);

export const shareSuccess = createAction(
  '[Share] Download Success'
);

export const shareFailure = createAction(
  '[Share] Download Failure',
  props<{ error: any }>()
);
