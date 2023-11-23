import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchFinderModalComponent } from './batch-finder-modal.component';

describe('BatchFinderModalComponent', () => {
  let component: BatchFinderModalComponent;
  let fixture: ComponentFixture<BatchFinderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchFinderModalComponent]
    });
    fixture = TestBed.createComponent(BatchFinderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
