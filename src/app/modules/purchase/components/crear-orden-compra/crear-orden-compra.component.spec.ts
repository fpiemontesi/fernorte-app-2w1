import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdenCompraComponent } from './crear-orden-compra.component';

describe('CrearOrdenCompraComponent', () => {
  let component: CrearOrdenCompraComponent;
  let fixture: ComponentFixture<CrearOrdenCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearOrdenCompraComponent]
    });
    fixture = TestBed.createComponent(CrearOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
