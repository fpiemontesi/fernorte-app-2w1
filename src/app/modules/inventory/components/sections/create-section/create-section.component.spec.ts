import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionComponent } from './create-section.component';

describe('AltaSeccionComponent', () => {
  let component: CreateSectionComponent;
  let fixture: ComponentFixture<CreateSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSectionComponent]
    });
    fixture = TestBed.createComponent(CreateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
