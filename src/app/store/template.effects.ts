import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TemplateService } from '../shared/services';
import { toastError, toastInfo, toastSuccess, toastWarn } from './toast.actions';
import * as TemplateActions from './template.actions';

@Injectable()
export class TemplateEffects {

  loadTemplates$ = createEffect(() => this.actions$.pipe( 
    ofType(TemplateActions.loadTemplates),
    switchMap(() => this.templateService.loadTemplates().pipe(
      map(templates => TemplateActions.loadTemplatesSuccess({ templates })),
      catchError(error => of(TemplateActions.loadTemplatesFailure({ error })))
    ))
  ));

  patchTemplates$ = createEffect(() => this.actions$.pipe( 
    ofType(TemplateActions.patchTemplates),
    concatMap(patchTemplates => this.templateService.patchTemplates(patchTemplates.templates).pipe(
      map(templates => TemplateActions.patchTemplatesSuccess({ templates })),
      catchError(error => of(TemplateActions.patchTemplatesFailure({ error })))
    ))
  ));

  createTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.createTemplateSuccess),
    switchMap(createTemplateSuccess => of(toastSuccess({
      summary: 'Template created successfully!',
      detail: createTemplateSuccess.template.title
    })))
  ));

  updateTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.updateTemplateSuccess),
    switchMap(updateTemplateSuccess => of(toastInfo({
      summary: 'Template updated successfully!',
      detail: updateTemplateSuccess.template.title
    })))
  ));

  deleteTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.deleteTemplateSuccess),
    switchMap(deleteTemplateSuccess => of(toastWarn({
      summary: 'Template deleted successfully!',
      detail: deleteTemplateSuccess.template.title
    })))
  ));

  patchTemplatesSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.patchTemplatesSuccess),
    switchMap(patchTemplatesSuccess => of(toastSuccess({
      summary: 'Templates imported successfully!',
      detail: patchTemplatesSuccess.templates.length.toString()
    })))
  ));

  loadTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.loadTemplatesFailure),
    switchMap(loadTemplatesFailure => of(toastError({
      summary: 'Error while loading templates!',
      detail: loadTemplatesFailure.error
    })))
  ));

  patchTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.patchTemplatesFailure),
    switchMap(patchTemplatesFailure => of(toastError({
      summary: 'Error while patching templates!',
      detail: patchTemplatesFailure.error
    })))
  ));

  navigateToTemplates$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.deleteTemplateSuccess, TemplateActions.patchTemplatesSuccess),
    tap(() => this.router.navigate(['templates']))
  ), { dispatch: false });

  constructor(
    private templateService: TemplateService,
    private actions$: Actions,
    private router: Router
  ) {}

}
