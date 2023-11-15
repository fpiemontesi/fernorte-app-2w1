import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomersPointsComponent } from './get-customers-points.component';

describe('GetCustomersPointsComponent', () => {
  let component: GetCustomersPointsComponent;
  let fixture: ComponentFixture<GetCustomersPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCustomersPointsComponent]
    });
    fixture = TestBed.createComponent(GetCustomersPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
