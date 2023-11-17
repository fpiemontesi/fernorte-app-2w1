import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenCompraComponent } from './ver-orden-compra.component';

describe('VerOrdenCompraComponent', () => {
  let component: VerOrdenCompraComponent;
  let fixture: ComponentFixture<VerOrdenCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerOrdenCompraComponent]
    });
    fixture = TestBed.createComponent(VerOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
