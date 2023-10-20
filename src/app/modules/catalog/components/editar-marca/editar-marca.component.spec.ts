import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMarcaComponent } from './editar-marca.component';

describe('EditarMarcaComponent', () => {
  let component: EditarMarcaComponent;
  let fixture: ComponentFixture<EditarMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMarcaComponent]
    });
    fixture = TestBed.createComponent(EditarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
