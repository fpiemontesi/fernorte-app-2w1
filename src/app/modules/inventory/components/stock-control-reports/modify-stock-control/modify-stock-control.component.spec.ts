import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStockControlComponent } from './modify-stock-control.component';

describe('ModifyStockControlComponent', () => {
  let component: ModifyStockControlComponent;
  let fixture: ComponentFixture<ModifyStockControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyStockControlComponent]
    });
    fixture = TestBed.createComponent(ModifyStockControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
