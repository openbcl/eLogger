import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RecordServiceMock, StoreMock } from '../testing/mocks';
import { RecordService } from '../services/record.service';
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
        }, {
          provide: Store,
          useValue: StoreMock
        }
      ]
    });

    effects = TestBed.inject(RecordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
