import { TestBed } from '@angular/core/testing';

import { DolarServiceService } from './dolar.service';

describe('DolarServiceService', () => {
  let service: DolarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
