import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarExistenciaComponent } from './registrar-existencia.component';

describe('RegistrarExistenciaComponent', () => {
  let component: RegistrarExistenciaComponent;
  let fixture: ComponentFixture<RegistrarExistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarExistenciaComponent]
    });
    fixture = TestBed.createComponent(RegistrarExistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
