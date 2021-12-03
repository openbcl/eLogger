import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTypeService } from '../../shared/services';
import * as LogTypeActions from './logtype.actions';


@Injectable()
export class LogTypeEffects {

  loadLogTypes$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTypeActions.loadLogTypes),
    switchMap(() => this.logTypeService.loadLogTypes().pipe(
      map(logTypes => LogTypeActions.loadLogTypesSuccess({ logTypes })),
      catchError(error => of(LogTypeActions.loadLogTypesFailure({ error })))
    ))
  ));

  loadLogType$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTypeActions.loadLogType),
    switchMap(loadLogType => this.logTypeService.loadLogType(loadLogType.id).pipe(
      map(logType => LogTypeActions.loadLogTypeSuccess({ logType })),
      catchError(error => of(LogTypeActions.loadLogTypeFailure({ error })))
    ))
  ));

  createLogType$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTypeActions.createLogType),
    switchMap(createLogType => this.logTypeService.createLogType(createLogType.logType).pipe(
      map(logType => LogTypeActions.createLogTypeSuccess({ logType })),
      catchError(error => of(LogTypeActions.createLogTypeFailure({ error })))
    ))
  ));

  updateLogType$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTypeActions.updateLogType),
    switchMap(updateLogType => this.logTypeService.updateLogType(updateLogType.logType).pipe(
      map(logType => LogTypeActions.updateLogTypeSuccess({ logType })),
      catchError(error => of(LogTypeActions.updateLogTypeFailure({ error })))
    ))
  ));

  deleteLogType$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTypeActions.deleteLogType),
    switchMap(deleteLogType => this.logTypeService.deleteLogType(deleteLogType.logType).pipe(
      map(logType => LogTypeActions.deleteLogTypeSuccess({ logType })),
      catchError(error => of(LogTypeActions.deleteLogTypeFailure({ error })))
    ))
  ));

  constructor(
    private logTypeService: LogTypeService,
    private actions$: Actions
    ) {}

}
