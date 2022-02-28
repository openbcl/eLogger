import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogTemplateServiceMock, StoreMock } from '../../shared/testing/mocks';
import { LogTemplateService } from '../../shared/services';
import { LogTemplateEffects } from './logtemplate.effects';

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
        },
        {
          provide: Store,
          useValue: StoreMock
        }
      ]
    });

    effects = TestBed.inject(LogTemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
