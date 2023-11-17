import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarComponent } from './eliminar.component';

describe('EliminarComponent', () => {
  let component: EliminarComponent;
  let fixture: ComponentFixture<EliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarComponent]
    });
    fixture = TestBed.createComponent(EliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
