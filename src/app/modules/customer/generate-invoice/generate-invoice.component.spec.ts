import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInvoiceComponent } from './generate-invoice.component';

describe('GenerateInvoiceComponent', () => {
  let component: GenerateInvoiceComponent;
  let fixture: ComponentFixture<GenerateInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateInvoiceComponent]
    });
    fixture = TestBed.createComponent(GenerateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
