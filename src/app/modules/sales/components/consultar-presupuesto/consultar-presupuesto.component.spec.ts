import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPresupuestoComponent } from './consultar-presupuesto.component';

describe('ConsultarPresupuestoComponent', () => {
  let component: ConsultarPresupuestoComponent;
  let fixture: ComponentFixture<ConsultarPresupuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPresupuestoComponent]
    });
    fixture = TestBed.createComponent(ConsultarPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
