import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductosComponent } from './top-productos.component';

describe('TopProductosComponent', () => {
  let component: TopProductosComponent;
  let fixture: ComponentFixture<TopProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopProductosComponent]
    });
    fixture = TestBed.createComponent(TopProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
