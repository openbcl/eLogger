import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as SettingActions from './setting.actions';



@Injectable()
export class SettingEffects {

  loadSettings$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(SettingActions.loadSettings),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => SettingActions.loadSettingsSuccess({ data })),
          catchError(error => of(SettingActions.loadSettingsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
