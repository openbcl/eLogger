import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTemplateService } from '../../shared/services';
import * as LazyLogTemplateActions from './logtemplate.actions';
import * as LogTemplateActions from '../../store/logtemplate.actions';

@Injectable()
export class LogTemplateEffects {

  loadLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogTemplateActions.loadLogTemplate),
    switchMap(loadLogTemplate => this.logTemplateService.loadLogTemplate(loadLogTemplate.id).pipe(
      map(logTemplate => LazyLogTemplateActions.loadLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LazyLogTemplateActions.loadLogTemplateFailure({ error })))
    ))
  ));

  createLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogTemplateActions.createLogTemplate),
    concatMap(createLogTemplate => this.logTemplateService.createLogTemplate(createLogTemplate.title, createLogTemplate.desc).pipe(
      map(logTemplate => LogTemplateActions.createLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LazyLogTemplateActions.createLogTemplateFailure({ error })))
    ))
  ));

  updateLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogTemplateActions.updateLogTemplate),
    concatMap(updateLogTemplate => this.logTemplateService.updateLogTemplate(updateLogTemplate.logTemplate).pipe(
      map(logTemplate => LogTemplateActions.updateLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LazyLogTemplateActions.updateLogTemplateFailure({ error })))
    ))
  ));

  deleteLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogTemplateActions.deleteLogTemplate),
    concatMap(deleteLogTemplate => this.logTemplateService.deleteLogTemplate(deleteLogTemplate.logTemplate).pipe(
      map(logTemplate => LogTemplateActions.deleteLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LazyLogTemplateActions.deleteLogTemplateFailure({ error })))
    ))
  ));

  constructor(
    private logTemplateService: LogTemplateService,
    private actions$: Actions
  ) {}

}
