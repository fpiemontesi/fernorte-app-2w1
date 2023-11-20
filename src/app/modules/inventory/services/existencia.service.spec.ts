/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExistenciaService } from './existencia.service';

describe('Service: Existencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistenciaService]
    });
  });

  it('should ...', inject([ExistenciaService], (service: ExistenciaService) => {
    expect(service).toBeTruthy();
  }));
});
