import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExistenciasComponent } from './listar-existencias.component';

describe('ListarExistenciasComponent', () => {
  let component: ListarExistenciasComponent;
  let fixture: ComponentFixture<ListarExistenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarExistenciasComponent]
    });
    fixture = TestBed.createComponent(ListarExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
