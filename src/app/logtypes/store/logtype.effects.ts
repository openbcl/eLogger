import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as LogtypeActions from './logtype.actions';



@Injectable()
export class LogtypeEffects {

  loadLogtypes$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LogtypeActions.loadLogtypes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => LogtypeActions.loadLogtypesSuccess({ data })),
          catchError(error => of(LogtypeActions.loadLogtypesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
