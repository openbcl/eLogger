import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceStub } from '../testing/stubs';
import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceStub
      }]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
