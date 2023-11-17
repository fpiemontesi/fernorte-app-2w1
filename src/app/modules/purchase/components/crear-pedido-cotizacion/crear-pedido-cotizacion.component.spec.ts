import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPedidoCotizacionComponent } from './crear-pedido-cotizacion.component';

describe('CrearPedidoCotizacionComponent', () => {
  let component: CrearPedidoCotizacionComponent;
  let fixture: ComponentFixture<CrearPedidoCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPedidoCotizacionComponent]
    });
    fixture = TestBed.createComponent(CrearPedidoCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
