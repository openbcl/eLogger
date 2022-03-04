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

  reorderLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(LogActions.reorderLogs),
    concatMap(reorderLogs => this.logService.reorderLogs(reorderLogs.logs).pipe(
      concatMap(logs => of(LogActions.reorderLogsSuccess({ logs }), LogActions.loadLogsSuccess({ logs }))),
      catchError(error => of(LogActions.reorderLogsFailure({ error })))
    ))
  ));

  deleteLogSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.deleteLogSuccess),
    tap(() => this.router.navigate(['logs']))
  ), { dispatch: false });

  constructor(
    private logService: LogService,
    private actions$: Actions,
    private router: Router
  ) {}

}
