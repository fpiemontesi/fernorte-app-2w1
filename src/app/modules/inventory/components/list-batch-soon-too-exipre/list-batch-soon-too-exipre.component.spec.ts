import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBatchSoonTooExipreComponent } from './list-batch-soon-too-exipre.component';

describe('ListBatchSoonTooExipreComponent', () => {
  let component: ListBatchSoonTooExipreComponent;
  let fixture: ComponentFixture<ListBatchSoonTooExipreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBatchSoonTooExipreComponent]
    });
    fixture = TestBed.createComponent(ListBatchSoonTooExipreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
