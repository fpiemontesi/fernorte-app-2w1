import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponenteditarComponent } from './modal-componenteditar.component';

describe('ModalComponenteditarComponent', () => {
  let component: ModalComponenteditarComponent;
  let fixture: ComponentFixture<ModalComponenteditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponenteditarComponent]
    });
    fixture = TestBed.createComponent(ModalComponenteditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
