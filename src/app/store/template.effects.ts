import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TemplateService } from '../services/template.service';
import * as ToastActions from './toast.actions';
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
    tap(createTemplateSuccess => this.router.navigate(['templates', createTemplateSuccess.template.id])),
    switchMap(createTemplateSuccess => of(ToastActions.toastSuccess({
      summary: $localize`:Template created information@@TemplateEffects\:createTemplateSuccessHeadline:Template created successfully!`,
      detail: createTemplateSuccess.template.title
    })))
  ));

  updateTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.updateTemplateSuccess),
    switchMap(updateTemplateSuccess => of(ToastActions.toastInfo({
      summary: $localize`:Template updated information@@TemplateEffects\:updateTemplateSuccessHeadline:Template updated successfully!`,
      detail: updateTemplateSuccess.template.title
    })))
  ));

  deleteTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.deleteTemplateSuccess),
    switchMap(deleteTemplateSuccess => of(ToastActions.toastSuccess({
      summary: $localize`:Template deleted information@@TemplateEffects\:deleteTemplateSuccessHeadline:Template deleted successfully!`,
      detail: deleteTemplateSuccess.template.title
    })))
  ));

  patchTemplatesSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.patchTemplatesSuccess),
    switchMap(patchTemplatesSuccess => of(ToastActions.toastSuccess({
      summary: $localize`:Templates imported information@@TemplateEffects\:patchTemplatesSuccessHeadline:Templates imported successfully!`,
      detail: patchTemplatesSuccess.templates.length.toString()
    })))
  ));

  loadTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.loadTemplatesFailure),
    switchMap(loadTemplatesFailure => of(ToastActions.toastError({
      summary: $localize`:Templates not found error@@TemplateEffects\:loadTemplatesFailureHeadline:Error while loading templates!`,
      detail: loadTemplatesFailure.error
    })))
  ));

  patchTemplatesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.patchTemplatesFailure),
    switchMap(patchTemplatesFailure => of(ToastActions.toastError({
      summary: $localize`:Templates not patched error@@TemplateEffects\:patchTemplatesFailureHeadline:Error while patching templates!`,
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
