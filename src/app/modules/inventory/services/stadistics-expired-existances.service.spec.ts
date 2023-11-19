/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StadisticsExpiredExistancesService } from './stadistics-expired-existances.service';

describe('Service: StadisticsExpiredExistances', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StadisticsExpiredExistancesService]
    });
  });

  it('should ...', inject([StadisticsExpiredExistancesService], (service: StadisticsExpiredExistancesService) => {
    expect(service).toBeTruthy();
  }));
});
