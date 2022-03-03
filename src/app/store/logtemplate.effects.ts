import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogTemplateService } from '../shared/services';
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

  patchLogTemplate$ = createEffect(() => this.actions$.pipe( 
    ofType(LogTemplateActions.patchLogTemplate),
    concatMap(patchLogTemplate => this.logTemplateService.patchLogTemplate(patchLogTemplate.logTemplate).pipe(
      map(logTemplate => LogTemplateActions.patchLogTemplateSuccess({ logTemplate })),
      catchError(error => of(LogTemplateActions.patchLogTemplateFailure({ error })))
    ))
  ));

  deleteLogTemplateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogTemplateActions.deleteLogTemplateSuccess),
    tap(() => this.router.navigate(['templates']))
  ), { dispatch: false });

  constructor(
    private logTemplateService: LogTemplateService,
    private actions$: Actions,
    private router: Router
  ) {}

}
