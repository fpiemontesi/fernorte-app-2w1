import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFormaDePagoComponent } from './reporte-forma-de-pago.component';

describe('ReporteFormaDePagoComponent', () => {
  let component: ReporteFormaDePagoComponent;
  let fixture: ComponentFixture<ReporteFormaDePagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteFormaDePagoComponent]
    });
    fixture = TestBed.createComponent(ReporteFormaDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
