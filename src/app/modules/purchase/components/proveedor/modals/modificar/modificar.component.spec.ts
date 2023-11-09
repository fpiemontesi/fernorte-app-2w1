import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarComponent } from './modificar.component';

describe('ModificarComponent', () => {
  let component: ModificarComponent;
  let fixture: ComponentFixture<ModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarComponent]
    });
    fixture = TestBed.createComponent(ModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
