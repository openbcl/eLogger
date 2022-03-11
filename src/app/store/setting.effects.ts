import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SettingService } from '../services/setting.service';
import * as SettingActions from './setting.actions';
import { toastError, toastSuccess } from './toast.actions';

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

  loadLanguage$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.loadLanguage),
    switchMap(() => of(this.settingService.loadLanguage()).pipe(
      map(language => SettingActions.loadLanguageSuccess({ language })),
      catchError(error => of(SettingActions.loadLanguageFailure({ error })))
    ))
  ));

  setLanguage$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.setLanguage),
    switchMap(setLanguage => of(this.settingService.setLanguage(setLanguage.language)).pipe(
      map(language => SettingActions.setLanguageSuccess({ language })),
      catchError(error => of(SettingActions.setLanguageFailure({ error })))
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

  resetDB$ = createEffect(() => this.actions$.pipe( 
    ofType(SettingActions.resetDB),
    switchMap(() => of(this.settingService.resetDB()).pipe(
      map(() => SettingActions.resetDBSuccess()),
      catchError(error => of(SettingActions.resetDBFailure({ error })))
    ))
  ));

  loadThemeFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadThemeFailure),
    switchMap(loadThemeFailure => of(toastError({
      summary: 'Error while loading theme!',
      detail: loadThemeFailure.error
    })))
  ));

  loadSeperatorFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadSeperatorFailure),
    switchMap(loadSeperatorFailure => of(toastError({
      summary: 'Error while loading csv seperator setting!',
      detail: loadSeperatorFailure.error
    })))
  ));

  loadLanguageFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadLanguageFailure),
    switchMap(loadLanguageFailure => of(toastError({
      summary: 'Error while loading language setting!',
      detail: loadLanguageFailure.error
    })))
  ));

  loadBeepFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.loadBeepFailure),
    switchMap(loadBeepFailure => of(toastError({
      summary: 'Error while loading record beep setting!',
      detail: loadBeepFailure.error
    })))
  ));

  resetDBFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.resetDBFailure),
    switchMap(resetDBFailure => of(toastError({
      summary: 'Error while resetting database!',
      detail: resetDBFailure.error
    })))
  ));

  resetDBSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SettingActions.resetDBSuccess),
    switchMap(() => of(toastSuccess({
      summary: 'Database reset successfully!',
    })))
  ));

  constructor(
    private settingService: SettingService,
    private actions$: Actions
  ) {}

}
