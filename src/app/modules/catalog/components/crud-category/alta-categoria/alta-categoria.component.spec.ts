import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCategoriaComponent } from './alta-categoria.component';

describe('AltaCategoriaComponent', () => {
  let component: AltaCategoriaComponent;
  let fixture: ComponentFixture<AltaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaCategoriaComponent]
    });
    fixture = TestBed.createComponent(AltaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
