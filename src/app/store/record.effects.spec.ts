import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RecordServiceMock } from '../shared/testing/mocks';
import { RecordService } from '../shared/services';

import { RecordEffects } from './record.effects';

describe('RecordEffects', () => {
  let actions$: Observable<any>;
  let effects: RecordEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecordEffects,
        provideMockActions(() => actions$), {
          provide: RecordService,
          useValue: RecordServiceMock
        }
      ]
    });

    effects = TestBed.inject(RecordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
