import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { logTemplatesSelector } from '../../store/logtemplate.selectors';


@Injectable({
  providedIn: 'root'
})
export class LandingpageGuard implements CanActivate {

    logTemplates$ = this.store.pipe(select(logTemplatesSelector));

    constructor(
    private router: Router,
    private store: Store
    ) { }

    canActivate() {
        return this.logTemplates$.pipe(switchMap(logTemplates => of(this.router.parseUrl(!!logTemplates?.length ? 'logs' : 'templates'))));
    }
}