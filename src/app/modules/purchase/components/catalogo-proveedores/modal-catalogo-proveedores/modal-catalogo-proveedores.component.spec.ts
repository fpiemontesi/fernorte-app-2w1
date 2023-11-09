import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCatalogoProveedoresComponent } from './modal-catalogo-proveedores.component';

describe('ModalCatalogoProveedoresComponent', () => {
  let component: ModalCatalogoProveedoresComponent;
  let fixture: ComponentFixture<ModalCatalogoProveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCatalogoProveedoresComponent]
    });
    fixture = TestBed.createComponent(ModalCatalogoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
