import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceMock } from '../testing/mocks';
import { LogTemplateService } from './logtemplate.service';

describe('LogTemplateService', () => {
  let service: LogTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceMock
      }]
    });
    service = TestBed.inject(LogTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
