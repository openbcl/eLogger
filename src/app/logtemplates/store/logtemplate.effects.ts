import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTemplateService } from '../../shared/services';
import * as LogTemplateActions from './logtemplate.actions';


@Injectable()
export class LogTemplateEffects {

  loadLogTemplates$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.loadLogTemplates),
    switchMap(() => this.logTemplateService.loadLogTemplates().pipe(
      map(logTemplates => LogTemplateActions.loadLogTemplatesSuccess({ logTemplates })),
      catchError(error => of(LogTemplateActions.loadLogTemplatesFailure({ error })))
    ))
  ));

  loadLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.loadLogTemplate),
    switchMap(loadLogTemplate => this.logTemplateService.loadLogTemplate(loadLogTemplate.id).pipe(
      map(logTemplate => LogTemplateActions.loadLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LogTemplateActions.loadLogTemplateFailure({ error })))
    ))
  ));

  createLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.createLogTemplate),
    switchMap(createLogTemplate => this.logTemplateService.createLogTemplate(createLogTemplate.title, createLogTemplate.desc).pipe(
      map(logTemplate => LogTemplateActions.createLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LogTemplateActions.createLogTemplateFailure({ error })))
    ))
  ));

  updateLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.updateLogTemplate),
    switchMap(updateLogTemplate => this.logTemplateService.updateLogTemplate(updateLogTemplate.logTemplate).pipe(
      map(logTemplate => LogTemplateActions.updateLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LogTemplateActions.updateLogTemplateFailure({ error })))
    ))
  ));

  deleteLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.deleteLogTemplate),
    switchMap(deleteLogTemplate => this.logTemplateService.deleteLogTemplate(deleteLogTemplate.logTemplate).pipe(
      map(logTemplate => LogTemplateActions.deleteLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LogTemplateActions.deleteLogTemplateFailure({ error })))
    ))
  ));

  constructor(
    private logTemplateService: LogTemplateService,
    private actions$: Actions
  ) {}

}
