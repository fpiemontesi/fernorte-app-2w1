/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StadisticsDamagedExistancesComponent } from './stadistics-damaged-existances.component';

describe('StadisticsDamagedExistancesComponent', () => {
  let component: StadisticsDamagedExistancesComponent;
  let fixture: ComponentFixture<StadisticsDamagedExistancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadisticsDamagedExistancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsDamagedExistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
