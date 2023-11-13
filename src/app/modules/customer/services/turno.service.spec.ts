import { TestBed } from '@angular/core/testing';

import { TurnoService } from './turno.service';

describe('TurnoService', () => {
  let service: TurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
