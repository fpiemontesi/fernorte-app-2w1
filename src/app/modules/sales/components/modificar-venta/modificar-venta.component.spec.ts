import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarVentaComponent } from './modificar-venta.component';

describe('ModificarVentaComponent', () => {
  let component: ModificarVentaComponent;
  let fixture: ComponentFixture<ModificarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarVentaComponent]
    });
    fixture = TestBed.createComponent(ModificarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
