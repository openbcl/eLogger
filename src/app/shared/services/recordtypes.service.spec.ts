import { TestBed } from '@angular/core/testing';

import { RecordtypesService } from './recordtypes.service';

describe('RecordtypesService', () => {
  let service: RecordtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
