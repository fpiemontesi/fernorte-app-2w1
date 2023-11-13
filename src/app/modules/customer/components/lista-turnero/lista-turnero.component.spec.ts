import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTurneroComponent } from './lista-turnero.component';

describe('ListaTurneroComponent', () => {
  let component: ListaTurneroComponent;
  let fixture: ComponentFixture<ListaTurneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTurneroComponent]
    });
    fixture = TestBed.createComponent(ListaTurneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
