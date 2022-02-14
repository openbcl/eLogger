import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService } from '../../shared/services';
import * as LazyLogActions from './log.actions';
import * as LogActions from '../../store/log.actions';

@Injectable()
export class LogEffects {

  loadLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.loadLog),
    switchMap(loadLog => this.logService.loadLog(loadLog.id).pipe(
      map(log => LazyLogActions.loadLogSuccess({ log })),
      catchError(error => of(LazyLogActions.loadLogFailure({ error })))
    ))
  ));

  createLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.createLog),
    switchMap(createLog => this.logService.createLog(createLog.logTemplateId, createLog.title, createLog.desc).pipe(
      map(log => LogActions.createLogSuccess({ log })),
      catchError(error => of(LazyLogActions.createLogFailure({ error })))
    ))
  ));

  updateLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.updateLog),
    switchMap(updateLog => this.logService.updateLog(updateLog.log).pipe(
      map(log => LogActions.updateLogSuccess({ log })),
      catchError(error => of(LazyLogActions.updateLogFailure({ error })))
    ))
  ));

  deleteLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogActions.deleteLog),
    switchMap(deleteLog => this.logService.deleteLog(deleteLog.log).pipe(
      map(log => LogActions.deleteLogSuccess({ log })),
      catchError(error => of(LazyLogActions.deleteLogFailure({ error })))
    ))
  ));

  constructor(
    private logService: LogService,
    private actions$: Actions
  ) {}

}
