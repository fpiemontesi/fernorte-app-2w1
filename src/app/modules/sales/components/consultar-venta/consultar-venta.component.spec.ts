import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVentaComponent } from './consultar-venta.component';

describe('ConsultarVentaComponent', () => {
  let component: ConsultarVentaComponent;
  let fixture: ComponentFixture<ConsultarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarVentaComponent]
    });
    fixture = TestBed.createComponent(ConsultarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
