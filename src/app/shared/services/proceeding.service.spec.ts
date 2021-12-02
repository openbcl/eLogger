import { TestBed } from '@angular/core/testing';

import { ProceedingService } from './proceeding.service';

describe('ProceedingService', () => {
  let service: ProceedingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProceedingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
