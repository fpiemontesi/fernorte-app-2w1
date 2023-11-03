import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTurnsComponent } from './get-turns.component';

describe('GetTurnsComponent', () => {
  let component: GetTurnsComponent;
  let fixture: ComponentFixture<GetTurnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTurnsComponent]
    });
    fixture = TestBed.createComponent(GetTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
