import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap, take, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService } from '../../services/log.service';
import { RecordService } from '../../services/record.service';
import { logIdSelector } from '../../store/router.selector';
import { toastError } from '../../store/toast.actions';
import * as LazyLogActions from './log.actions';
import * as LogActions from '../../store/log.actions';
import * as RecordActions from '../../store/record.actions';
import { Router } from '@angular/router';


@Injectable()
export class LogEffects {

  loadLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.loadLog),
    switchMap(loadLog => 
      this.store.pipe(
        select(logIdSelector),
        take(1),
        filter(logId => !!(logId || loadLog.id)),
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
    concatMap(createLog => this.logService.createLog(createLog.templateId, createLog.title, createLog.desc).pipe(
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
      concatMap(() => this.logService.deleteLog(deleteLog.log).pipe(
        map(log => LogActions.deleteLogSuccess({ log })),
        catchError(error => of(LazyLogActions.deleteLogFailure({ error })))
      )),
      catchError(error => of(LazyLogActions.deleteLogFailure({ error }))),
    ))
  ));

  createRecordSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.createRecordSuccess),
    concatMap(createRecordSuccess => this.logService.loadLog(createRecordSuccess.record.logId).pipe(
      concatMap(log => this.logService.updateLog({ ...log, recordsCount: log.recordsCount + 1 }).pipe(
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ), { dispatch: false });

  revokeRecordSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.revokeRecordSuccess),
    concatMap(revokeRecordSuccess => this.logService.loadLog(revokeRecordSuccess.logId).pipe(
      concatMap(log => this.logService.updateLog({ ...log, recordsCount: log.recordsCount - 1 }).pipe(
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ), { dispatch: false });

  deleteRecordsSuccess$ = createEffect(() => this.actions$.pipe( 
    ofType(RecordActions.deleteRecordsSuccess),
    concatMap(deleteRecordsSuccess => this.logService.loadLog(deleteRecordsSuccess.logId).pipe(
      concatMap(log => this.logService.updateLog({ ...log, recordsCount: 0 }).pipe(
        catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))))
  ), { dispatch: false });

  loadLogFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogActions.loadLogFailure),
    tap(() => this.router.navigate(['logs'])),
    switchMap(loadLogFailure => of(toastError({
      summary: 'Error while loading log!',
      detail: loadLogFailure.error
    })))
  ));

  createLogFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogActions.createLogFailure),
    switchMap(createLogFailure => of(toastError({
      summary: 'Error while creating log!',
      detail: createLogFailure.error
    })))
  ));

  updateLogFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogActions.updateLogFailure),
    switchMap(updateLogFailure => of(toastError({
      summary: 'Error while updating log!',
      detail: updateLogFailure.error
    })))
  ));

  deleteLogFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogActions.deleteLogFailure),
    switchMap(deleteLogFailure => of(toastError({
      summary: 'Error while deleting log!',
      detail: deleteLogFailure.error
    })))
  ));

  constructor(
    private store: Store,
    private logService: LogService,
    private recordService: RecordService,
    private actions$: Actions,
    private router: Router
  ) {}

}
