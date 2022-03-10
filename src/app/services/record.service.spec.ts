import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBServiceMock } from '../testing/mocks';
import { RecordService } from './record.service';

describe('RecordService', () => {
  let service: RecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxIndexedDBService,
        useValue: NgxIndexedDBServiceMock
      }]
    });
    service = TestBed.inject(RecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
