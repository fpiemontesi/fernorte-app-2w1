import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFacturaComponent } from './delete-factura.component';

describe('DeleteFacturaComponent', () => {
  let component: DeleteFacturaComponent;
  let fixture: ComponentFixture<DeleteFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFacturaComponent]
    });
    fixture = TestBed.createComponent(DeleteFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
