import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVentasComponent } from './tipo-ventas.component';

describe('TipoVentasComponent', () => {
  let component: TipoVentasComponent;
  let fixture: ComponentFixture<TipoVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoVentasComponent]
    });
    fixture = TestBed.createComponent(TipoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
