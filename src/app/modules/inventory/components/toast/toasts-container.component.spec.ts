import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsContainer } from './toasts-container.component';

describe('ToastsComponent', () => {
  let component: ToastsContainer;
  let fixture: ComponentFixture<ToastsContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastsContainer]
    });
    fixture = TestBed.createComponent(ToastsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
