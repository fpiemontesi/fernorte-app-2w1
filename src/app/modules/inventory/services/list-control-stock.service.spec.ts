import { TestBed } from '@angular/core/testing';

import { ListControlStockService } from './list-control-stock.service';

describe('ListControlStockService', () => {
  let service: ListControlStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListControlStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
