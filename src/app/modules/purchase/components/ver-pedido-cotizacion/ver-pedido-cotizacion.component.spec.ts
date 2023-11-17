import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoCotizacionComponent } from './ver-pedido-cotizacion.component';

describe('VerPedidoCotizacionComponent', () => {
  let component: VerPedidoCotizacionComponent;
  let fixture: ComponentFixture<VerPedidoCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPedidoCotizacionComponent]
    });
    fixture = TestBed.createComponent(VerPedidoCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
