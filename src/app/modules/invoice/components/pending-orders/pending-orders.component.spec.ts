import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersComponent } from './pending-orders.component';

describe('PendingOrdersComponent', () => {
  let component: PendingOrdersComponent;
  let fixture: ComponentFixture<PendingOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingOrdersComponent]
    });
    fixture = TestBed.createComponent(PendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
