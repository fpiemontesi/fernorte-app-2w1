/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PresupuestoService } from './presupuesto.service';

describe('Service: Presupuesto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresupuestoService]
    });
  });

  it('should ...', inject([PresupuestoService], (service: PresupuestoService) => {
    expect(service).toBeTruthy();
  }));
});
