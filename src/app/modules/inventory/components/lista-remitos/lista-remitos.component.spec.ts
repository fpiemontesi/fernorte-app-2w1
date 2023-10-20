import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRemitosComponent } from './lista-remitos.component';

describe('ListaRemitosComponent', () => {
  let component: ListaRemitosComponent;
  let fixture: ComponentFixture<ListaRemitosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaRemitosComponent]
    });
    fixture = TestBed.createComponent(ListaRemitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
