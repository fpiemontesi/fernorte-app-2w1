import { TestBed } from '@angular/core/testing';

import { ExistenciasService } from './existance.service';

describe('ExistenciasService', () => {
  let service: ExistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
