import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ExportService } from '../services/export.service';
import { ExportServiceMock, StoreMock } from '../testing/mocks';

import { ShareEffects } from './share.effects';

describe('ShareEffects', () => {
  let actions$: Observable<any>;
  let effects: ShareEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShareEffects,
        provideMockActions(() => actions$), {
          provide: ExportService,
          useValue: ExportServiceMock
        }, {
          provide: Store,
          useValue: StoreMock
        }
      ]
    });

    effects = TestBed.inject(ShareEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
