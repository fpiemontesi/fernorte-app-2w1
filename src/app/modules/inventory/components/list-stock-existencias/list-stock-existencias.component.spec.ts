import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockExistenciasComponent } from './list-stock-existencias.component';

describe('ListStockExistenciasComponent', () => {
  let component: ListStockExistenciasComponent;
  let fixture: ComponentFixture<ListStockExistenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStockExistenciasComponent]
    });
    fixture = TestBed.createComponent(ListStockExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
