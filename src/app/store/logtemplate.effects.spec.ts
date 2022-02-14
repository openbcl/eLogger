import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LogTemplateServiceMock, RouterMock } from '../shared/testing/mocks';
import { LogTemplateService } from '../shared/services';

import { LogTemplateEffects } from './logtemplate.effects';
import { Router } from '@angular/router';

describe('LogTemplateEffects', () => {
  let actions$: Observable<any>;
  let effects: LogTemplateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogTemplateEffects,
        provideMockActions(() => actions$), {
          provide: LogTemplateService,
          useValue: LogTemplateServiceMock
        }, {
          provide: Router,
          useValue: RouterMock
        }
      ]
    });

    effects = TestBed.inject(LogTemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
