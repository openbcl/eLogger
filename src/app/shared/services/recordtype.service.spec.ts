import { TestBed } from '@angular/core/testing';

import { RecordTypeService } from './recordtype.service';

describe('RecordTypeService', () => {
  let service: RecordTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
