import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExistenciasStockBajoComponent } from './listar-existencias-stock-bajo.component';

describe('ListarExistenciasStockBajoComponent', () => {
  let component: ListarExistenciasStockBajoComponent;
  let fixture: ComponentFixture<ListarExistenciasStockBajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarExistenciasStockBajoComponent]
    });
    fixture = TestBed.createComponent(ListarExistenciasStockBajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
