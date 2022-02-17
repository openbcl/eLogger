import { createAction, props } from '@ngrx/store';
import { Record } from '../shared/models';

export const loadRecords = createAction(
  '[Record] Load Records',
  props<{ logId: string }>()
);

export const loadRecordsFailure = createAction(
  '[Record] Load Records Failure',
  props<{ error: any }>()
);

export const loadRecordsSuccess = createAction(
  '[Record] Load Records Success',
  props<{ records: Record[] }>()
);

export const createRecordSuccess = createAction(
  '[Record] Create Record Success',
  props<{ record: Record }>()
);

export const revokeRecordSuccess = createAction(
  '[Record] Revoke Record Success',
  props<{ logId: string }>()
);

export const deleteRecordsSuccess = createAction(
  '[Record] Delete Records Success',
  props<{ logId: string }>()
);