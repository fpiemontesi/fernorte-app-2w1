import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPagoComponent } from './registrar-pago.component';

describe('RegistrarPagoComponent', () => {
  let component: RegistrarPagoComponent;
  let fixture: ComponentFixture<RegistrarPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPagoComponent]
    });
    fixture = TestBed.createComponent(RegistrarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
