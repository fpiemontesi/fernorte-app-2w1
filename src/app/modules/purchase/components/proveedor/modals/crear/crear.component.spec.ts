import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComponent } from './crear.component';

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComponent]
    });
    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
