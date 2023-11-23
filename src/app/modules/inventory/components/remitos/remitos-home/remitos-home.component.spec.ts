import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitosHomeComponent } from './remitos-home.component';

describe('RemitosHomeComponent', () => {
  let component: RemitosHomeComponent;
  let fixture: ComponentFixture<RemitosHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemitosHomeComponent]
    });
    fixture = TestBed.createComponent(RemitosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
