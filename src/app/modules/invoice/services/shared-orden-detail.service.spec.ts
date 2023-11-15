import { TestBed } from '@angular/core/testing';

import { SharedOrdenDetailService } from './shared-orden-detail.service';

describe('SharedOrdenDetailService', () => {
  let service: SharedOrdenDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedOrdenDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
