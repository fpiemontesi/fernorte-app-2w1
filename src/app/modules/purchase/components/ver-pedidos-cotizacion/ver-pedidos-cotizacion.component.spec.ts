import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidosCotizacionComponent } from './ver-pedidos-cotizacion.component';

describe('VerPedidosCotizacionComponent', () => {
  let component: VerPedidosCotizacionComponent;
  let fixture: ComponentFixture<VerPedidosCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPedidosCotizacionComponent]
    });
    fixture = TestBed.createComponent(VerPedidosCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
