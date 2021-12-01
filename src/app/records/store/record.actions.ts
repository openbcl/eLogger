import { createAction, props } from '@ngrx/store';

export const loadRecords = createAction(
  '[Record] Load Records'
);

export const loadRecordsSuccess = createAction(
  '[Record] Load Records Success',
  props<{ data: any }>()
);

export const loadRecordsFailure = createAction(
  '[Record] Load Records Failure',
  props<{ error: any }>()
);
