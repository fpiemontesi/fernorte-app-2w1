import { TestBed } from '@angular/core/testing';

import { ListarExistenciasService } from './listar-existencias.service';

describe('ListarExistenciasService', () => {
  let service: ListarExistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarExistenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
