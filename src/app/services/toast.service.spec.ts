import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { MessageServiceMock } from '../testing/mocks';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MessageService,
        useValue: MessageServiceMock
      }]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
