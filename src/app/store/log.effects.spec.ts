import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LogServiceMock, RouterMock } from '../testing/mocks';
import { LogService } from '../services/log.service';

import { LogEffects } from './log.effects';
import { Router } from '@angular/router';

describe('LogEffects', () => {
  let actions$: Observable<any>;
  let effects: LogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogEffects,
        provideMockActions(() => actions$), {
          provide: LogService,
          useValue: LogServiceMock
        }, {
          provide: Router,
          useValue: RouterMock
        }
      ]
    });

    effects = TestBed.inject(LogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
