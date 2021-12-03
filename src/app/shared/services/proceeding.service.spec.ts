import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceStub } from '../testing/stubs';
import { ProceedingService } from './proceeding.service';

describe('ProceedingService', () => {
  let service: ProceedingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceStub
      }]
    });
    service = TestBed.inject(ProceedingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
