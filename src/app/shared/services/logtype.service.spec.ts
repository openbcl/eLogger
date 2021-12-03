import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceStub } from '../testing/stubs';
import { LogTypeService } from './logtype.service';

describe('LogTypeService', () => {
  let service: LogTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceStub
      }]
    });
    service = TestBed.inject(LogTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
