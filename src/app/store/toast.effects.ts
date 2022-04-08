import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import * as ToastActions from './toast.actions';

@Injectable()
export class ToastEffects {

    toastSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ToastActions.toastSuccess),
        tap(toastSuccess => this.toastService.toastSuccess(toastSuccess.summary, toastSuccess.detail))
    ), { dispatch: false });

    toastInfo$ = createEffect(() => this.actions$.pipe(
        ofType(ToastActions.toastInfo),
        tap(toastInfo => this.toastService.toastInfo(toastInfo.summary, toastInfo.detail))
    ), { dispatch: false });

    toastWarn$ = createEffect(() => this.actions$.pipe(
        ofType(ToastActions.toastWarn),
        tap(toastWarn => this.toastService.toastWarn(toastWarn.summary, toastWarn.detail))
    ), { dispatch: false });

    toastError$ = createEffect(() => this.actions$.pipe(
        ofType(ToastActions.toastError),
        tap(toastError => this.toastService.toastError(toastError.summary, toastError.detail))
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private toastService: ToastService
    ) {}

}