/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BatchService } from './batch.service';

describe('Service: Lote', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchService]
    });
  });

  it('should ...', inject([BatchService], (service: BatchService) => {
    expect(service).toBeTruthy();
  }));
});
