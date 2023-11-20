/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VoidShowComponent } from './void-show.component';

describe('VoidShowComponent', () => {
  let component: VoidShowComponent;
  let fixture: ComponentFixture<VoidShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
