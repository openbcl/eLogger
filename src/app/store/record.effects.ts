import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecordService } from '../services/record.service';
import { logIdSelector } from './router.selector';
import * as ToastActions from './toast.actions';
import * as RecordActions from './record.actions';

@Injectable()
export class RecordEffects {

  loadRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.loadRecords),
    switchMap(loadRecords => 
      this.store.pipe(
        select(logIdSelector),
        take(1),
        filter(logId => !!(logId || loadRecords.logId)),
        switchMap(logId => this.recordService.loadRecords(logId || loadRecords.logId).pipe(
          map(records => RecordActions.loadRecordsSuccess({ records })),
          catchError(error => of(RecordActions.loadRecordsFailure({ error })))
        ))
      )
    )
  ));

  loadAllRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.loadAllRecords),
    switchMap(() => this.recordService.loadAllRecords().pipe(
      map(records => RecordActions.loadAllRecordsSuccess({ records })),
      catchError(error => of(RecordActions.loadAllRecordsFailure({ error })))
    ))
  ));

  countTotalRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.countTotalRecords),
    switchMap(() => this.recordService.countTotalRecords().pipe(
      map(total => RecordActions.countTotalRecordsSuccess({ total })),
      catchError(error => of(RecordActions.countTotalRecordsFailure({ error })))
    ))
  ));

  createRecord$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.createRecord),
    concatMap(createRecord => this.recordService.createRecord(createRecord.eventTemplate, createRecord.logId, createRecord.date, createRecord.text).pipe(
      map(record => RecordActions.createRecordSuccess({ record })),
      catchError(error => of(RecordActions.createRecordFailure({ error })))
    ))
  ));

  revokeRecord$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.revokeRecord),
    concatMap(revokeRecord => 
      this.store.pipe(
        select(logIdSelector),
        take(1),
        filter(logId => !!(logId || revokeRecord.logId)),
        concatMap(logId => this.recordService.revokeRecord(logId || revokeRecord.logId).pipe(
          map(logId => RecordActions.revokeRecordSuccess({ logId })),
          catchError(error => of(RecordActions.revokeRecordFailure({ error })))
        ))
      )
    )
  ));

  deleteRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.deleteRecords),
    concatMap(deleteRecords => 
      this.store.pipe(
        select(logIdSelector),
        take(1),
        filter(logId => !!(logId || deleteRecords.logId)),
        concatMap(logId => this.recordService.deleteRecords(logId || deleteRecords.logId).pipe(
          map(logId => RecordActions.deleteRecordsSuccess({ logId })),
          catchError(error => of(RecordActions.deleteRecordsFailure({ error })))
        ))
      )
    )
  ));

  createRecordSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.createRecordSuccess),
    tap(() => window.navigator.vibrate && window.navigator.vibrate(100))
  ), { dispatch: false });

  deleteRecordsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.deleteRecordsSuccess),
    switchMap(() => of(ToastActions.toastSuccess({
      summary: 'Records deleted successfully!'
    })))
  ));

  loadRecordsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.loadRecordsFailure),
    switchMap(loadRecordsFailure => of(ToastActions.toastError({
      summary: 'Error while loading records!',
      detail: loadRecordsFailure.error
    })))
  ));

  loadAllRecordsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.loadAllRecordsFailure),
    switchMap(loadAllRecordsFailure => of(ToastActions.toastError({
      summary: 'Error while loading all records!',
      detail: loadAllRecordsFailure.error
    })))
  ));

  createRecordFailure$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.createRecordFailure),
    switchMap(createRecordFailure => of(ToastActions.toastError({
      summary: 'Error while creating record!',
      detail: createRecordFailure.error
    })))
  ));

  revokeRecordFailure$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.revokeRecordFailure),
    switchMap(revokeRecordFailure => of(ToastActions.toastError({
      summary: 'Error while revoking record!',
      detail: revokeRecordFailure.error
    })))
  ));

  deleteRecordsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.deleteRecordsFailure),
    switchMap(deleteRecordsFailure => of(ToastActions.toastError({
      summary: 'Error while deleting records!',
      detail: deleteRecordsFailure.error
    })))
  ));

  constructor(
    private store: Store,
    private recordService: RecordService,
    private actions$: Actions
  ) {}

}
