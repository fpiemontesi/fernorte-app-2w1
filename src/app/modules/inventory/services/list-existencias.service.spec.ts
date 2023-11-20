import { TestBed } from '@angular/core/testing';

import { ListExistenciasService } from './list-existencias.service';

describe('ListExistenciasService', () => {
  let service: ListExistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListExistenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
