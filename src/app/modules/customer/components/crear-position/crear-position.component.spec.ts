import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPositionComponent } from './crear-position.component';

describe('CrearPositionComponent', () => {
  let component: CrearPositionComponent;
  let fixture: ComponentFixture<CrearPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPositionComponent]
    });
    fixture = TestBed.createComponent(CrearPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
