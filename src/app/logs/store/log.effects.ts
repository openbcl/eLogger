import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as LogActions from './log.actions';



@Injectable()
export class LogEffects {

  loadLogs$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LogActions.loadLogs),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => LogActions.loadLogsSuccess({ data })),
          catchError(error => of(LogActions.loadLogsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
