import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponentbajaComponent } from './modal-componentbaja.component';

describe('ModalComponentbajaComponent', () => {
  let component: ModalComponentbajaComponent;
  let fixture: ComponentFixture<ModalComponentbajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponentbajaComponent]
    });
    fixture = TestBed.createComponent(ModalComponentbajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
