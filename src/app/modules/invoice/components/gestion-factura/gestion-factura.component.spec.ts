import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFacturaComponent } from './gestion-factura.component';

describe('GestionFacturaComponent', () => {
  let component: GestionFacturaComponent;
  let fixture: ComponentFixture<GestionFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFacturaComponent]
    });
    fixture = TestBed.createComponent(GestionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
