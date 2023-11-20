import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateControlReportComponent } from './create-control-report.component';

describe('CreateControlReportComponent', () => {
  let component: CreateControlReportComponent;
  let fixture: ComponentFixture<CreateControlReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateControlReportComponent]
    });
    fixture = TestBed.createComponent(CreateControlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
