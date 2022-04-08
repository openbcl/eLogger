import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SettingService } from '../services/setting.service';
import * as SettingActions from './setting.actions';
import * as ToastActions from './toast.actions';

@Injectable()
export class SettingEffects {

  loadTheme$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.loadTheme),
    switchMap(() => of(this.settingService.loadTheme()).pipe(
      map(theme => SettingActions.loadThemeSuccess({ theme })),
      catchError(error => of(SettingActions.loadThemeFailure({ error })))
    ))
  ));

  setTheme$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.setTheme),
    switchMap(setTheme => of(this.settingService.setTheme(setTheme.theme)).pipe(
      map(theme => SettingActions.setThemeSuccess({ theme })),
      catchError(error => of(SettingActions.setThemeFailure({ error })))
    ))
  ));

  loadSeperator$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.loadSeperator),
    switchMap(() => of(this.settingService.loadSeperator()).pipe(
      map(seperator => SettingActions.loadSeperatorSuccess({ seperator })),
      catchError(error => of(SettingActions.loadSeperatorFailure({ error })))
    ))
  ));

  setSeperator$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.setSeperator),
    switchMap(setSeperator => of(this.settingService.setSeperator(setSeperator.seperator)).pipe(
      map(seperator => SettingActions.setSeperatorSuccess({ seperator })),
      catchError(error => of(SettingActions.setSeperatorFailure({ error })))
    ))
  ));

  loadBeep$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.loadBeep),
    switchMap(() => of(this.settingService.loadBeep()).pipe(
      map(beep => SettingActions.loadBeepSuccess({ beep })),
      catchError(error => of(SettingActions.loadBeepFailure({ error })))
    ))
  ));

  setBeep$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.setBeep),
    switchMap(setBeep => of(this.settingService.setBeep(setBeep.beep)).pipe(
      map(beep => SettingActions.setBeepSuccess({ beep })),
      catchError(error => of(SettingActions.setBeepFailure({ error })))
    ))
  ));

  loadQuality$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.loadQuality),
    switchMap(() => of(this.settingService.loadQuality()).pipe(
      map(quality => SettingActions.loadQualitySuccess({ quality })),
      catchError(error => of(SettingActions.loadQualityFailure({ error })))
    ))
  ));

  setQuality$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.setQuality),
    switchMap(setQuality => of(this.settingService.setQuality(setQuality.quality)).pipe(
      map(quality => SettingActions.setQualitySuccess({ quality })),
      catchError(error => of(SettingActions.setQualityFailure({ error })))
    ))
  ));

  resetDB$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.resetDB),
    switchMap(() => this.settingService.resetDB().pipe(
      map(() => SettingActions.resetDBSuccess()),
      catchError(error => of(SettingActions.resetDBFailure({ error })))
    ))
  ));

  loadThemeFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadThemeFailure),
    switchMap(loadThemeFailure => of(ToastActions.toastError({
      summary: $localize`:Could not load theme error@@SettingEffects\:loadThemeFailureHeadline:Error while loading theme!`,
      detail: loadThemeFailure.error
    })))
  ));

  loadSeperatorFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadSeperatorFailure),
    switchMap(loadSeperatorFailure => of(ToastActions.toastError({
      summary: $localize`:Could not load seperator error@@SettingEffects\:loadSeperatorFailureHeadline:Error while loading csv seperator setting!`,
      detail: loadSeperatorFailure.error
    })))
  ));

  loadBeepFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadBeepFailure),
    switchMap(loadBeepFailure => of(ToastActions.toastError({
      summary: $localize`:Could not load event sound setting error@@SettingEffects\:loadBeepFailureHeadline:Error while loading record beep setting!`,
      detail: loadBeepFailure.error
    })))
  ));

  loadQualityFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadQualityFailure),
    switchMap(loadQualityFailure => of(ToastActions.toastError({
      summary: $localize`:Could not load photo quality setting error@@SettingEffects\:loadQualityFailureHeadline:Error while loading photo quality setting!`,
      detail: loadQualityFailure.error
    })))
  ));

  resetDBFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.resetDBFailure),
    switchMap(resetDBFailure => of(ToastActions.toastError({
      summary: $localize`:Could not reset database error@@SettingEffects\:resetDBFailureHeadline:Error while resetting database!`,
      detail: resetDBFailure.error
    })))
  ));

  setSeperatorSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.setSeperatorSuccess),
    switchMap(setSeperatorSuccess => of(ToastActions.toastSuccess({
      summary: $localize`:Seperator configured information@@SettingEffects\:setSeperatorSuccessHeadline:Switched seperator successfully!`,
      detail: setSeperatorSuccess.seperator
    })))
  ));

  setBeepSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.setBeepSuccess),
    switchMap(setBeepSuccess => {
      const enabled = $localize`:Event sound enabled information@@SettingEffects\:setBeepSuccessEnabledDetails:Sound enabled`;
      const disabled = $localize`:Event sound disabled information@@SettingEffects\:setBeepSuccessDisabledDetails:Sound disabled`;
      return of(ToastActions.toastSuccess({
        summary: $localize`:Event sound configured information@@SettingEffects\:setBeepSuccessHeadline:Event sound`,
        detail: setBeepSuccess.beep ? enabled : disabled
      }))
    })
  ));

  resetDBSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.resetDBSuccess),
    switchMap(() => of(ToastActions.toastSuccess({
      summary: $localize`:Database resetted information@@SettingEffects\:resetDBSuccessHeadline:Database reset successfully!`,
    })))
  ));

  constructor(
    private settingService: SettingService,
    private actions$: Actions
  ) {}

}
