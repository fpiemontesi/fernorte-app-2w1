import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBatchesByExistenceComponent } from './list-batches-by-existence.component';

describe('ListBatchesByExistenceComponent', () => {
  let component: ListBatchesByExistenceComponent;
  let fixture: ComponentFixture<ListBatchesByExistenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBatchesByExistenceComponent]
    });
    fixture = TestBed.createComponent(ListBatchesByExistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
