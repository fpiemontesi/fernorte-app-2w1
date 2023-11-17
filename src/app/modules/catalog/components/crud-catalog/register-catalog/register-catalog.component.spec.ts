import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCatalogComponent } from './register-catalog.component';

describe('RegisterCatalogComponent', () => {
  let component: RegisterCatalogComponent;
  let fixture: ComponentFixture<RegisterCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCatalogComponent]
    });
    fixture = TestBed.createComponent(RegisterCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
