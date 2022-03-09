import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogService } from '../shared/services';
import { toastError, toastInfo, toastSuccess, toastWarn } from './toast.actions';
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

  createLogSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.createLogSuccess),
    switchMap(createLogSuccess => of(toastSuccess({
      summary: 'Log created successfully!',
      detail: createLogSuccess.log.title
    })))
  ));

  updateLogSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.updateLogSuccess),
    switchMap(updateLogSuccess => of(toastInfo({
      summary: 'Log updated successfully!',
      detail: updateLogSuccess.log.title
    })))
  ));

  deleteLogSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.deleteLogSuccess),
    switchMap(deleteLogSuccess => of(toastWarn({
      summary: 'Log deleted successfully!',
      detail: deleteLogSuccess.log.title
    })))
  ));

  patchLogsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.patchLogsSuccess),
    switchMap(patchLogsSuccess => of(toastSuccess({
      summary: 'Logs imported successfully!',
      detail: patchLogsSuccess.logs.length.toString()
    })))
  ));

  loadLogsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.loadLogsFailure),
    switchMap(loadLogsFailure => of(toastError({
      summary: 'Error while loading logs!',
      detail: loadLogsFailure.error
    })))
  ));

  patchLogsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.patchLogsFailure),
    switchMap(patchLogsFailure => of(toastError({
      summary: 'Error while patching logs!',
      detail: patchLogsFailure.error
    })))
  ));

  reorderLogsFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogActions.reorderLogsFailure),
    switchMap(reorderLogsFailure => of(toastError({
      summary: 'Error while reordering logs!',
      detail: reorderLogsFailure.error
    })))
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
