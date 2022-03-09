import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTemplateService } from '../shared/services';
import { toastError, toastSuccess } from './toast.actions';
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

  patchLogTemplates$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.patchLogTemplates),
    concatMap(patchLogTemplates => this.logTemplateService.patchLogTemplates(patchLogTemplates.logTemplates).pipe(
      map(logTemplates => LogTemplateActions.patchLogTemplatesSuccess({ logTemplates })),
      catchError(error => of(LogTemplateActions.patchLogTemplatesFailure({ error })))
    ))
  ));

  createLogTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.createLogTemplateSuccess),
    switchMap(createLogTemplateSuccess => of(toastSuccess({
      summary: 'Template created successfully!',
      detail: createLogTemplateSuccess.logTemplate.title
    })))
  ));

  updateLogTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.updateLogTemplateSuccess),
    switchMap(updateLogTemplateSuccess => of(toastSuccess({
      summary: 'Template upldated successfully!',
      detail: updateLogTemplateSuccess.logTemplate.title
    })))
  ));

  deleteLogTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.deleteLogTemplateSuccess),
    switchMap(deleteLogTemplateSuccess => of(toastSuccess({
      summary: 'Template deleted successfully!',
      detail: deleteLogTemplateSuccess.logTemplate.title
    })))
  ));

  patchLogTemplatesSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.patchLogTemplatesSuccess),
    switchMap(patchLogTemplatesSuccess => of(toastSuccess({
      summary: 'Templates imported successfully!',
      detail: patchLogTemplatesSuccess.logTemplates.length.toString()
    })))
  ));

  loadLogTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.loadLogTemplatesFailure),
    switchMap(loadLogTemplatesFailure => of(toastError({
      summary: 'Error while loading templates!',
      detail: loadLogTemplatesFailure.error
    })))
  ));

  patchLogTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.patchLogTemplatesFailure),
    switchMap(patchLogTemplatesFailure => of(toastError({
      summary: 'Error while patching templates!',
      detail: patchLogTemplatesFailure.error
    })))
  ));

  navigateToTemplates$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.deleteLogTemplateSuccess, LogTemplateActions.patchLogTemplatesSuccess),
    tap(() => this.router.navigate(['templates']))
  ), { dispatch: false });

  constructor(
    private logTemplateService: LogTemplateService,
    private actions$: Actions,
    private router: Router
  ) {}

}
