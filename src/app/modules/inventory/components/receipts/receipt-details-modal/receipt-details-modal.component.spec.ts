import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailsModalComponent } from './receipt-details-modal.component';

describe('ShipmentDetailsModalComponent', () => {
  let component: ReceiptDetailsModalComponent;
  let fixture: ComponentFixture<ReceiptDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptDetailsModalComponent]
    });
    fixture = TestBed.createComponent(ReceiptDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
