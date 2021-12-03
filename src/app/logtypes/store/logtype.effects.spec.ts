import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LogtypeEffects } from './logtype.effects';

describe('LogtypeEffects', () => {
  let actions$: Observable<any>;
  let effects: LogtypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogtypeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LogtypeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
