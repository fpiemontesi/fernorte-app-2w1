import { TestBed } from '@angular/core/testing';

import { RemitoService } from './remito.service';

describe('RemitoService', () => {
  let service: RemitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
