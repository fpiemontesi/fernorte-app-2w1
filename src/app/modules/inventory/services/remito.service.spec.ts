import { TestBed } from '@angular/core/testing';

import { RemitoServService } from './remito.service';

describe('RemitoServService', () => {
  let service: RemitoServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemitoServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
