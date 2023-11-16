import { TestBed } from '@angular/core/testing';

import { ExistenciaStockService } from './existencia-stock.service';

describe('ExistenciaStockService', () => {
  let service: ExistenciaStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistenciaStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
