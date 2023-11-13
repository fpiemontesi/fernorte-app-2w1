import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserComponent } from './get-user.component';

describe('GetUserComponent', () => {
  let component: GetUserComponent;
  let fixture: ComponentFixture<GetUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUserComponent]
    });
    fixture = TestBed.createComponent(GetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
