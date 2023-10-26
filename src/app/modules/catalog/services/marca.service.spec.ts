import { TestBed } from '@angular/core/testing';

import { MarcaService } from './marca.service';

describe('MarcaService', () => {
  let service: MarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
