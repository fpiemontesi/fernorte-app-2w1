import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOfferComponent } from './register-offer.component';

describe('RegisterOfferComponent', () => {
  let component: RegisterOfferComponent;
  let fixture: ComponentFixture<RegisterOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOfferComponent]
    });
    fixture = TestBed.createComponent(RegisterOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
