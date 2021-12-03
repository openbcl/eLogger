import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceStub } from '../testing/stubs';
import { RecordTypeService } from './recordtype.service';

describe('RecordTypeService', () => {
  let service: RecordTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceStub
      }]
    });
    service = TestBed.inject(RecordTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
