import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBenefitsComponent } from './get-benefits.component';

describe('GetBenefitsComponent', () => {
  let component: GetBenefitsComponent;
  let fixture: ComponentFixture<GetBenefitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetBenefitsComponent]
    });
    fixture = TestBed.createComponent(GetBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
