import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as RecordActions from './record.actions';



@Injectable()
export class RecordEffects {

  loadRecords$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RecordActions.loadRecords),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => RecordActions.loadRecordsSuccess({ data })),
          catchError(error => of(RecordActions.loadRecordsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
