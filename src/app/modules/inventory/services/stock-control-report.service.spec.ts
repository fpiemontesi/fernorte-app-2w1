import { TestBed } from '@angular/core/testing';

import { StockControlReportService } from './stock-control-report.service';

describe('StockControlReportService', () => {
  let service: StockControlReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockControlReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
