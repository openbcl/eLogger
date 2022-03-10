import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { PipeMock, StoreMock } from '../testing/mocks';
import { EventLabelPipe, EventRelTimePipe } from '../ui/pipes/event.pipe';
import { TemplateDescPipe, TemplateTitlePipe } from '../ui/pipes/log.pipe';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: EventLabelPipe,
        useValue: PipeMock,
      }, {
        provide: DatePipe,
        useValue: PipeMock,
      }, {
        provide: EventRelTimePipe,
        useValue: PipeMock,
      }, {
        provide: TemplateTitlePipe,
        useValue: PipeMock,
      }, {
        provide: TemplateDescPipe,
        useValue: PipeMock,
      }, {
        provide: Store,
        useValue: StoreMock
      }]
    });
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
