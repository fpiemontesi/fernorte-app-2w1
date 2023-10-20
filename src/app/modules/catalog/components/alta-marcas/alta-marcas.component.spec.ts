import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMarcasComponent } from './alta-marcas.component';

describe('AltaMarcasComponent', () => {
  let component: AltaMarcasComponent;
  let fixture: ComponentFixture<AltaMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaMarcasComponent]
    });
    fixture = TestBed.createComponent(AltaMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
