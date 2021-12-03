import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as LogTypeActions from './logtype.actions';



@Injectable()
export class LogTypeEffects {

  loadLogTypes$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LogTypeActions.loadLogTypes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(logTypes => LogTypeActions.loadLogTypesSuccess({ logTypes })),
          catchError(error => of(LogTypeActions.loadLogTypesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
