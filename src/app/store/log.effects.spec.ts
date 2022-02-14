import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LogServiceMock } from '../shared/testing/mocks';
import { LogService } from '../shared/services';

import { LogEffects } from './log.effects';

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
        }
      ]
    });

    effects = TestBed.inject(LogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
