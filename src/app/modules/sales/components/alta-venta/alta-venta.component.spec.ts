import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVentaComponent } from './alta-venta.component';

describe('AltaVentaComponent', () => {
  let component: AltaVentaComponent;
  let fixture: ComponentFixture<AltaVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaVentaComponent]
    });
    fixture = TestBed.createComponent(AltaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
