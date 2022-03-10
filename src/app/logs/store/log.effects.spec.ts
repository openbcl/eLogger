import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogServiceMock, RecordServiceMock, StoreMock } from '../../testing/mocks';
import { LogService, RecordService } from '../../services';
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
        }, {
          provide: RecordService,
          useValue: RecordServiceMock
        },
        {
          provide: Store,
          useValue: StoreMock
        }
      ]
    });

    effects = TestBed.inject(LogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
