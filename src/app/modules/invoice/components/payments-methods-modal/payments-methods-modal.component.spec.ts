import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsModalComponent } from './payments-methods-modal.component';

describe('PaymentsMethodsModalComponent', () => {
  let component: PaymentsMethodsModalComponent;
  let fixture: ComponentFixture<PaymentsMethodsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsMethodsModalComponent]
    });
    fixture = TestBed.createComponent(PaymentsMethodsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
