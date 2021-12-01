import { createAction, props } from '@ngrx/store';

export const loadRecordtypes = createAction(
  '[Recordtype] Load Recordtypes'
);

export const loadRecordtypesSuccess = createAction(
  '[Recordtype] Load Recordtypes Success',
  props<{ data: any }>()
);

export const loadRecordtypesFailure = createAction(
  '[Recordtype] Load Recordtypes Failure',
  props<{ error: any }>()
);
