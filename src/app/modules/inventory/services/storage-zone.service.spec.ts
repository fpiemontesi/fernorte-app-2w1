import { TestBed } from '@angular/core/testing';
import { StorageZoneService } from './storage-zone.service';

describe('StorageZoneService', () => {
  let service: StorageZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
