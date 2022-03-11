import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TemplateService } from '../services/template.service';


@Injectable({
  providedIn: 'root'
})
export class LandingpageGuard implements CanActivate {

    constructor(
    private router: Router,
    private templateService: TemplateService
    ) { }

    canActivate() {
        return this.templateService.loadTemplates().pipe(
          switchMap(templates => of(this.router.parseUrl(!!templates?.length ? 'logs' : 'templates')))
        );
    }
}