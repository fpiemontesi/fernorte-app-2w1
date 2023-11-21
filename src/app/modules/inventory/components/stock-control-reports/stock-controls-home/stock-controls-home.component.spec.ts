import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockControlsHomeComponent } from './stock-controls-home.component';

describe('StockControlsHomeComponent', () => {
  let component: StockControlsHomeComponent;
  let fixture: ComponentFixture<StockControlsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockControlsHomeComponent]
    });
    fixture = TestBed.createComponent(StockControlsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
