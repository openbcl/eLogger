import { createAction, props } from '@ngrx/store';
import { EventTemplate, Record } from '../shared/models';

export const loadRecords = createAction(
  '[Record] Load Records',
  props<{ logId?: string }>()
);

export const loadRecordsFailure = createAction(
  '[Record] Load Records Failure',
  props<{ error: any }>()
);

export const loadRecordsSuccess = createAction(
  '[Record] Load Records Success',
  props<{ records: Record[] }>()
);

export const loadAllRecords = createAction(
  '[Record] Load All Records'
);

export const loadAllRecordsFailure = createAction(
  '[Record] Load All Records Failure',
  props<{ error: any }>()
);

export const loadAllRecordsSuccess = createAction(
  '[Record] Load All Records Success',
  props<{ records: Record[] }>()
);

export const countTotalRecords = createAction(
  '[Record] Count Total Records'
);

export const countTotalRecordsFailure = createAction(
  '[Record] Count Total Records Failure',
  props<{ error: any }>()
);

export const countTotalRecordsSuccess = createAction(
  '[Record] Count Total Records Success',
  props<{ total: number }>()
);

export const createRecord = createAction(
  '[Record] Create Record',
  props<{ eventTemplate: EventTemplate, logId: string, date: Date, text?: string }>()
);

export const createRecordFailure = createAction(
  '[Record] Create Record Failure',
  props<{ error: any }>()
);

export const createRecordSuccess = createAction(
  '[Record] Create Record Success',
  props<{ record: Record }>()
);

export const revokeRecord = createAction(
  '[Record] Revoke Record',
  props<{ logId?: string }>()
);

export const revokeRecordFailure = createAction(
  '[Record] Revoke Record Failure',
  props<{ error: any }>()
);

export const revokeRecordSuccess = createAction(
  '[Record] Revoke Record Success',
  props<{ logId: string }>()
);

export const deleteRecords = createAction(
  '[Record] Delete Records',
  props<{ logId?: string }>()
);

export const deleteRecordsFailure = createAction(
  '[Record] Delete Records Failure',
  props<{ error: any }>()
);

export const deleteRecordsSuccess = createAction(
  '[Record] Delete Records Success',
  props<{ logId: string }>()
);