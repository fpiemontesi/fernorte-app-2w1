import { TestBed } from '@angular/core/testing';
import { ReceiptService } from './remito.service';

describe('RemitoServService', () => {
  let service: ReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
