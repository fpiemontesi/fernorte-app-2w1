import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPorMesesComponent } from './reportes-por-meses.component';

describe('ReportesPorMesesComponent', () => {
  let component: ReportesPorMesesComponent;
  let fixture: ComponentFixture<ReportesPorMesesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesPorMesesComponent]
    });
    fixture = TestBed.createComponent(ReportesPorMesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
