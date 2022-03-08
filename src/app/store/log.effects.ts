import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService } from '../shared/services';
import * as LogActions from './log.actions';

@Injectable()
export class LogEffects {

  loadLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.loadLogs),
    switchMap(() => this.logService.loadLogs().pipe(
      map(logs => LogActions.loadLogsSuccess({ logs })),
      catchError(error => of(LogActions.loadLogsFailure({ error })))
    ))
  ));

  patchLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.patchLogs),
    concatMap(patchLogs => this.logService.patchLogs(patchLogs.logs).pipe(
      map(logs => LogActions.patchLogsSuccess({ logs })),
      catchError(error => of(LogActions.patchLogsFailure({ error })))
    ))
  ));

  reorderLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.reorderLogs),
    concatMap(reorderLogs => this.logService.reorderLogs(reorderLogs.logs).pipe(
      concatMap(logs => of(LogActions.reorderLogsSuccess({ logs }), LogActions.loadLogsSuccess({ logs }))),
      catchError(error => of(LogActions.reorderLogsFailure({ error })))
    ))
  ));

  navigateToTemplates$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.deleteLogSuccess, LogActions.patchLogsSuccess),
    tap(() => this.router.navigate(['logs']))
  ), { dispatch: false });

  constructor(
    private logService: LogService,
    private actions$: Actions,
    private router: Router
  ) {}

}
