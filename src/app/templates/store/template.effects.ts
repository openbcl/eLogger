import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { templateIdSelector } from '../../store/router.selector';
import { catchError, concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TemplateService } from '../../services/template.service';
import { toastError } from '../../store/toast.actions';
import * as LazyTemplateActions from './template.actions';
import * as TemplateActions from '../../store/template.actions';
import { Router } from '@angular/router';

@Injectable()
export class TemplateEffects {

  loadTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyTemplateActions.loadTemplate),
    switchMap(loadTemplate => 
      this.store.pipe(
        select(templateIdSelector),
        take(1),
        filter(templateId => !!(templateId || loadTemplate.id)),
        switchMap(templateId => this.templateService.loadTemplate(templateId || loadTemplate.id).pipe(
          map(template => LazyTemplateActions.loadTemplateSuccess({ template })),
          catchError(error => of(LazyTemplateActions.loadTemplateFailure({ error })))
        ))
      )
    )
  ));

  createTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyTemplateActions.createTemplate),
    concatMap(createTemplate => this.templateService.createTemplate(createTemplate.title, createTemplate.desc).pipe(
      map(template => TemplateActions.createTemplateSuccess({ template })),
      catchError(error => of(LazyTemplateActions.createTemplateFailure({ error })))
    ))
  ));

  updateTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyTemplateActions.updateTemplate),
    concatMap(updateTemplate => this.templateService.updateTemplate(updateTemplate.template).pipe(
      map(template => TemplateActions.updateTemplateSuccess({ template })),
      catchError(error => of(LazyTemplateActions.updateTemplateFailure({ error })))
    ))
  ));

  deleteTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LazyTemplateActions.deleteTemplate),
    concatMap(deleteTemplate => this.templateService.deleteTemplate(deleteTemplate.template).pipe(
      map(template => TemplateActions.deleteTemplateSuccess({ template })),
      catchError(error => of(LazyTemplateActions.deleteTemplateFailure({ error })))
    ))
  ));

  loadTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyTemplateActions.loadTemplateFailure),
    tap(() => this.router.navigate(['templates'])),
    switchMap(loadTemplateFailure => of(toastError({
      summary: 'Error while loading template!',
      detail: loadTemplateFailure.error
    })))
  ));

  createTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyTemplateActions.createTemplateFailure),
    switchMap(createTemplateFailure => of(toastError({
      summary: 'Error while creating template!',
      detail: createTemplateFailure.error
    })))
  ));

  updateTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyTemplateActions.updateTemplateFailure),
    switchMap(updateTemplateFailure => of(toastError({
      summary: 'Error while updating template!',
      detail: updateTemplateFailure.error
    })))
  ));

  deleteTemplateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LazyTemplateActions.deleteTemplateFailure),
    switchMap(deleteTemplateFailure => of(toastError({
      summary: 'Error while deleting template!',
      detail: deleteTemplateFailure.error
    })))
  ));

  constructor(
    private store: Store,
    private templateService: TemplateService,
    private actions$: Actions,
    private router: Router
  ) {}

}
