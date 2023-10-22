/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExistenceService } from './existence.service';

describe('Service: Existence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistenceService]
    });
  });

  it('should ...', inject([ExistenceService], (service: ExistenceService) => {
    expect(service).toBeTruthy();
  }));
});
