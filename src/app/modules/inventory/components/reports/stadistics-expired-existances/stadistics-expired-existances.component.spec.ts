/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StadisticsExpiredExistancesComponent } from './stadistics-expired-existances.component';

describe('StadisticsExpiredExistancesComponent', () => {
  let component: StadisticsExpiredExistancesComponent;
  let fixture: ComponentFixture<StadisticsExpiredExistancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadisticsExpiredExistancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsExpiredExistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
