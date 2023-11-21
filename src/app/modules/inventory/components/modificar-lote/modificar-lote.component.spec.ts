import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLoteComponent } from './modificar-lote.component';

describe('ModificarLoteComponent', () => {
  let component: ModificarLoteComponent;
  let fixture: ComponentFixture<ModificarLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarLoteComponent]
    });
    fixture = TestBed.createComponent(ModificarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
