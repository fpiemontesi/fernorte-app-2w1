import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenesDeCompraComponent } from './ver-ordenes-de-compra.component';

describe('VerOrdenesDeCompraComponent', () => {
  let component: VerOrdenesDeCompraComponent;
  let fixture: ComponentFixture<VerOrdenesDeCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerOrdenesDeCompraComponent]
    });
    fixture = TestBed.createComponent(VerOrdenesDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
