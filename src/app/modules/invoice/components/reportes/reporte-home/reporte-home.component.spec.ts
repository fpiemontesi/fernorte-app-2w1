import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHomeComponent } from './reporte-home.component';

describe('ReporteHomeComponent', () => {
  let component: ReporteHomeComponent;
  let fixture: ComponentFixture<ReporteHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteHomeComponent]
    });
    fixture = TestBed.createComponent(ReporteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
