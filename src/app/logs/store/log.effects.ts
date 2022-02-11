import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LogActions from './log.actions';
import { LogService } from '../../shared/services';



@Injectable()
export class LogEffects {

  loadLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.loadLogs),
    switchMap(() => this.logService.loadLogs().pipe(
      map(logs => LogActions.loadLogsSuccess({ logs })),
      catchError(error => of(LogActions.loadLogsFailure({ error })))
    ))
  ));

  loadLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.loadLog),
    switchMap(loadLog => this.logService.loadLog(loadLog.id).pipe(
      map(log => LogActions.loadLogSuccess({ log })),
      catchError(error => of(LogActions.loadLogFailure({ error })))
    ))
  ));

  createLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.createLog),
    switchMap(createLog => this.logService.createLog(createLog.logTemplateId, createLog.title, createLog.desc).pipe(
      map(log => LogActions.createLogSuccess({ log })),
      catchError(error => of(LogActions.createLogFailure({ error })))
    ))
  ));

  updateLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.updateLog),
    switchMap(updateLog => this.logService.updateLog(updateLog.log).pipe(
      map(log => LogActions.updateLogSuccess({ log })),
      catchError(error => of(LogActions.updateLogFailure({ error })))
    ))
  ));

  deleteLog$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.deleteLog),
    switchMap(deleteLog => this.logService.deleteLog(deleteLog.log).pipe(
      map(log => LogActions.deleteLogSuccess({ log })),
      catchError(error => of(LogActions.deleteLogFailure({ error })))
    ))
  ));

  constructor(
    private logService: LogService,
    private actions$: Actions
  ) {}

}
