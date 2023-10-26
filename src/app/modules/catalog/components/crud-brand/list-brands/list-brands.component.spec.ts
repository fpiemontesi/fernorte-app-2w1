import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrandsComponent } from './list-brands.component';

describe('ListBrandsComponent', () => {
  let component: ListBrandsComponent;
  let fixture: ComponentFixture<ListBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBrandsComponent]
    });
    fixture = TestBed.createComponent(ListBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
