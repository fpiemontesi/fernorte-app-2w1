import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiscountsComponent } from './list-discounts.component';

describe('ListDiscountsComponent', () => {
  let component: ListDiscountsComponent;
  let fixture: ComponentFixture<ListDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDiscountsComponent]
    });
    fixture = TestBed.createComponent(ListDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
