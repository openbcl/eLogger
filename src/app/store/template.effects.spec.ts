import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TemplateServiceMock, RouterMock } from '../testing/mocks';
import { TemplateService } from '../services';

import { TemplateEffects } from './template.effects';
import { Router } from '@angular/router';

describe('TemplateEffects', () => {
  let actions$: Observable<any>;
  let effects: TemplateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateEffects,
        provideMockActions(() => actions$), {
          provide: TemplateService,
          useValue: TemplateServiceMock
        }, {
          provide: Router,
          useValue: RouterMock
        }
      ]
    });

    effects = TestBed.inject(TemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
