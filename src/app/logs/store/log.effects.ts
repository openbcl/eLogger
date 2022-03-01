import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap, take, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService, RecordService } from '../../shared/services';
import { logIdSelector } from '../../store/router.selector';
import * as LazyLogActions from './log.actions';
import * as LogActions from '../../store/log.actions';
import * as RecordActions from '../../store/record.actions';


@Injectable()
export class LogEffects {

  loadLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.loadLog),
    switchMap(loadLog => 
      this.store.pipe(
        select(logIdSelector),
        filter(logId => !!(logId ||loadLog.id)),
        switchMap(logId => 
          this.logService.loadLog(logId || loadLog.id).pipe(
            map(log => LazyLogActions.loadLogSuccess({ log })),
            catchError(error => of(LazyLogActions.loadLogFailure({ error })))
        ))
      )
    )
  ));

  createLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.createLog),
    concatMap(createLog => this.logService.createLog(createLog.logTemplateId, createLog.title, createLog.desc).pipe(
      map(log => LogActions.createLogSuccess({ log })),
      catchError(error => of(LazyLogActions.createLogFailure({ error })))
    ))
  ));

  updateLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.updateLog),
    concatMap(updateLog => this.logService.updateLog(updateLog.log).pipe(
      map(log => LogActions.updateLogSuccess({ log })),
      catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))
  ));

  deleteLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.deleteLog),
    concatMap(deleteLog => this.recordService.deleteRecords(deleteLog.log.id).pipe(
      switchMap(() => this.logService.deleteLog(deleteLog.log).pipe(
        map(log => LogActions.deleteLogSuccess({ log })),
        catchError(error => of(LazyLogActions.deleteLogFailure({ error })))
      )),
      catchError(error => of(LazyLogActions.deleteLogFailure({ error }))),
    ))
  ));

  createRecordSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.createRecordSuccess),
    concatMap(createRecordSuccess => this.logService.loadLog(createRecordSuccess.record.logId).pipe(
      switchMap(log => this.logService.updateLog({ ...log, recordsCount: log.recordsCount + 1 }).pipe(
        map(log => LogActions.updateLogSuccess({ log })),
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ));

  revokeRecordSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.revokeRecordSuccess),
    concatMap(revokeRecordSuccess => this.logService.loadLog(revokeRecordSuccess.logId).pipe(
      switchMap(log => this.logService.updateLog({ ...log, recordsCount: log.recordsCount - 1 }).pipe(
        map(log => LogActions.updateLogSuccess({ log })),
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ));

  deleteRecordsSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.deleteRecordsSuccess),
    concatMap(deleteRecordsSuccess => this.logService.loadLog(deleteRecordsSuccess.logId).pipe(
      switchMap(log => this.logService.updateLog({ ...log, recordsCount: 0 }).pipe(
        map(log => LogActions.updateLogSuccess({ log })),
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ));

  constructor(
    private store: Store,
    private logService: LogService,
    private recordService: RecordService,
    private actions$: Actions
  ) {}

}
