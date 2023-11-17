import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscountComponent } from './update-discount.component';

describe('UpdateDiscountComponent', () => {
  let component: UpdateDiscountComponent;
  let fixture: ComponentFixture<UpdateDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDiscountComponent]
    });
    fixture = TestBed.createComponent(UpdateDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
