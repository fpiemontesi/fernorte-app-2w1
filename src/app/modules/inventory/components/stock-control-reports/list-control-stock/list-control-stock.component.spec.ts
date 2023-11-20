import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListControlStockComponent } from './list-control-stock.component';

describe('ListControlStockComponent', () => {
  let component: ListControlStockComponent;
  let fixture: ComponentFixture<ListControlStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListControlStockComponent]
    });
    fixture = TestBed.createComponent(ListControlStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
