import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRemitoComponent } from './modificar-remito.component';

describe('ModificarRemitoComponent', () => {
  let component: ModificarRemitoComponent;
  let fixture: ComponentFixture<ModificarRemitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarRemitoComponent]
    });
    fixture = TestBed.createComponent(ModificarRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
