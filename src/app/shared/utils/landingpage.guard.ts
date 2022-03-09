import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LogTemplateService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class LandingpageGuard implements CanActivate {

    constructor(
    private router: Router,
    private logTemplateService: LogTemplateService
    ) { }

    canActivate() {
        return this.logTemplateService.loadLogTemplates().pipe(
          switchMap(logTemplates => of(this.router.parseUrl(!!logTemplates?.length ? 'logs' : 'templates')))
        );
    }
}