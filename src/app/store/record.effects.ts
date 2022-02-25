import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecordService } from '../shared/services';
import * as RecordActions from './record.actions';

@Injectable()
export class RecordEffects {

  loadRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.loadRecords),
    switchMap(loadRecords => this.recordService.loadRecords(loadRecords.logId).pipe(
      map(records => RecordActions.loadRecordsSuccess({ records })),
      catchError(error => of(RecordActions.loadRecordsFailure({ error })))
    ))
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
    concatMap(revokeRecord => this.recordService.revokeRecord(revokeRecord.logId).pipe(
      map(logId => RecordActions.revokeRecordSuccess({ logId })),
      catchError(error => of(RecordActions.revokeRecordFailure({ error })))
    ))
  ));

  deleteRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.deleteRecords),
    concatMap(deleteRecords => this.recordService.deleteRecords(deleteRecords.logId).pipe(
      map(logId => RecordActions.deleteRecordsSuccess({ logId })),
      catchError(error => of(RecordActions.deleteRecordsFailure({ error })))
    ))
  ));

  createRecordSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.createRecordSuccess),
    tap(() => !!window?.navigator && window.navigator.vibrate(100))
  ), { dispatch: false });

  constructor(
    private recordService: RecordService,
    private actions$: Actions
  ) {}

}
