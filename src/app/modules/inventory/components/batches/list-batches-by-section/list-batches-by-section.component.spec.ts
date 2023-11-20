import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBatchesBySectionComponent } from './list-batches-by-section.component';

describe('ListBatchesBySectionComponent', () => {
  let component: ListBatchesBySectionComponent;
  let fixture: ComponentFixture<ListBatchesBySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBatchesBySectionComponent]
    });
    fixture = TestBed.createComponent(ListBatchesBySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
