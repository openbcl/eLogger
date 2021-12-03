import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LogEffects } from './log.effects';

describe('LogEffects', () => {
  let actions$: Observable<any>;
  let effects: LogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
