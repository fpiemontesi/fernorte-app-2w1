import { TestBed } from '@angular/core/testing';

import { ServiceMarcaService } from './service-marca.service';

describe('ServiceMarcaService', () => {
  let service: ServiceMarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
