import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFechaComponent } from './filtro-fecha.component';

describe('FiltroFechaComponent', () => {
  let component: FiltroFechaComponent;
  let fixture: ComponentFixture<FiltroFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroFechaComponent]
    });
    fixture = TestBed.createComponent(FiltroFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
