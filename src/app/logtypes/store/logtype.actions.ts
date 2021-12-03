import { createAction, props } from '@ngrx/store';

export const loadLogtypes = createAction(
  '[Logtype] Load Logtypes'
);

export const loadLogtypesSuccess = createAction(
  '[Logtype] Load Logtypes Success',
  props<{ data: any }>()
);

export const loadLogtypesFailure = createAction(
  '[Logtype] Load Logtypes Failure',
  props<{ error: any }>()
);
