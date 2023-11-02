import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraComponent } from './orden-compra.component';

describe('OrdenCompraComponent', () => {
  let component: OrdenCompraComponent;
  let fixture: ComponentFixture<OrdenCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraComponent]
    });
    fixture = TestBed.createComponent(OrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
