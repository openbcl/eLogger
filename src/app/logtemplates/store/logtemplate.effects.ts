import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logTemplateIdSelector } from '../../store/router.selector';
import { catchError, concatMap, filter, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTemplateService } from '../../shared/services';
import { toastError } from '../../store/toast.actions';
import * as LazyLogTemplateActions from './logtemplate.actions';
import * as LogTemplateActions from '../../store/logtemplate.actions';

@Injectable()
export class LogTemplateEffects {

  loadLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyLogTemplateActions.loadLogTemplate),
    switchMap(loadLogTemplate => 
      this.store.pipe(
        select(logTemplateIdSelector),
        take(1),
        filter(logTemplateId => !!(logTemplateId || loadLogTemplate.id)),
        switchMap(logTemplateId => this.logTemplateService.loadLogTemplate(logTemplateId || loadLogTemplate.id).pipe(
          map(logTemplate => LazyLogTemplateActions.loadLogTemplateSuccess({ logTemplate })),
          catchError(error => of(LazyLogTemplateActions.loadLogTemplateFailure({ error })))
        ))
      )
    )
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

  loadLogTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogTemplateActions.loadLogTemplateFailure),
    switchMap(loadLogTemplateFailure => of(toastError({
      summary: 'Error while loading template!',
      detail: loadLogTemplateFailure.error
    })))
  ));

  createLogTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogTemplateActions.createLogTemplateFailure),
    switchMap(createLogTemplateFailure => of(toastError({
      summary: 'Error while creating template!',
      detail: createLogTemplateFailure.error
    })))
  ));

  updateLogTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogTemplateActions.updateLogTemplateFailure),
    switchMap(updateLogTemplateFailure => of(toastError({
      summary: 'Error while updating template!',
      detail: updateLogTemplateFailure.error
    })))
  ));

  deleteLogTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyLogTemplateActions.deleteLogTemplateFailure),
    switchMap(deleteLogTemplateFailure => of(toastError({
      summary: 'Error while deleting template!',
      detail: deleteLogTemplateFailure.error
    })))
  ));

  constructor(
    private store: Store,
    private logTemplateService: LogTemplateService,
    private actions$: Actions
  ) {}

}
