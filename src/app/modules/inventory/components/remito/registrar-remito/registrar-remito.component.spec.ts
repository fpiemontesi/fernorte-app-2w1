import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRemitoComponent } from './registrar-remito.component';

describe('RegistrarRemitoComponent', () => {
  let component: RegistrarRemitoComponent;
  let fixture: ComponentFixture<RegistrarRemitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarRemitoComponent]
    });
    fixture = TestBed.createComponent(RegistrarRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
