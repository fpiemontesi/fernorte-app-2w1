import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesHomeComponent } from './lotes-home.component';

describe('LotesHomeComponent', () => {
  let component: LotesHomeComponent;
  let fixture: ComponentFixture<LotesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotesHomeComponent]
    });
    fixture = TestBed.createComponent(LotesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
