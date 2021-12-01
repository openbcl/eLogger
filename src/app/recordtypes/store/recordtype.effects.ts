import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as RecordtypeActions from './recordtype.actions';



@Injectable()
export class RecordtypeEffects {

  loadRecordtypes$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RecordtypeActions.loadRecordtypes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => RecordtypeActions.loadRecordtypesSuccess({ data })),
          catchError(error => of(RecordtypeActions.loadRecordtypesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
