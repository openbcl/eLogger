import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { LogTemplateServiceMock } from '../../shared/testing/mocks';
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
        }
      ]
    });

    effects = TestBed.inject(LogTemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
