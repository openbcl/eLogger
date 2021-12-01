import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RecordtypeEffects } from './recordtype.effects';

describe('RecordtypeEffects', () => {
  let actions$: Observable<any>;
  let effects: RecordtypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecordtypeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RecordtypeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
