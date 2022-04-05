import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExportService } from '../services/export.service';
import { seperatorSelector } from './setting.selectors';
import * as ShareActions from './share.actions';
import * as ToastActions from './toast.actions';

@Injectable()
export class ShareEffects {

  shareRecords$ = createEffect(() => this.actions$.pipe( 
    ofType(ShareActions.shareRecords),
    switchMap(shareRecords =>
      this.store.pipe(
        select(seperatorSelector),
        take(1),
        concatMap(seperator => this.exportService.shareRecords(shareRecords.records, shareRecords.log, seperator).pipe(          
          map(() => ShareActions.shareSuccess()),
          catchError(error => of(ShareActions.shareFailure({ error })))
        ))
      )
    )
  ));

  shareLogs$ = createEffect(() => this.actions$.pipe( 
    ofType(ShareActions.shareLogs),
    switchMap(shareLogs =>
      this.store.pipe(
        select(seperatorSelector),
        take(1),
        concatMap(seperator => this.exportService.shareLogs(shareLogs.logs, shareLogs.templates, seperator).pipe(
          map(() => ShareActions.shareSuccess()),
          catchError(error => of(ShareActions.shareFailure({ error })))
        ))
      )
    )
  ));

  shareFailure$ = createEffect(() => this.actions$.pipe(
    ofType(ShareActions.shareFailure),
    switchMap(shareFailure => of(ToastActions.toastError({
      summary: $localize`:Download failed error@@ShareEffects\:shareFailureHeadline:Download failed!`,
      detail: shareFailure.error
    })))
  ));

  constructor(
    private store: Store,
    private exportService: ExportService,
    private actions$: Actions
  ) {}

}
