import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LogTypeEffects } from './logtype.effects';

describe('LogTypeEffects', () => {
  let actions$: Observable<any>;
  let effects: LogTypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogTypeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LogTypeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
