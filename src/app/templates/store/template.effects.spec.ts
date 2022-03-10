import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateServiceMock, StoreMock, RouterMock } from '../../testing/mocks';
import { TemplateService } from '../../services';
import { TemplateEffects } from './template.effects';

describe('TemplateEffects', () => {
  let actions$: Observable<any>;
  let effects: TemplateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateEffects,
        provideMockActions(() => actions$), {
          provide: TemplateService,
          useValue: TemplateServiceMock
        }, {
          provide: Router,
          useValue: RouterMock
        },
        {
          provide: Store,
          useValue: StoreMock
        }
      ]
    });

    effects = TestBed.inject(TemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
