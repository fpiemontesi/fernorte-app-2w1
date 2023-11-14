import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPresupuestoComponent } from './modificar-presupuesto.component';

describe('ModificarPresupuestoComponent', () => {
  let component: ModificarPresupuestoComponent;
  let fixture: ComponentFixture<ModificarPresupuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPresupuestoComponent]
    });
    fixture = TestBed.createComponent(ModificarPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
