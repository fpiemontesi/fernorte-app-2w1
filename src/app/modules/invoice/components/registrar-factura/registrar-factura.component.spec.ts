import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFacturaComponent } from './registrar-factura.component';

describe('RegistrarFacturaComponent', () => {
  let component: RegistrarFacturaComponent;
  let fixture: ComponentFixture<RegistrarFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarFacturaComponent]
    });
    fixture = TestBed.createComponent(RegistrarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
