import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {
  activeId = -1;

  constructor() { }

  ngOnInit() {
  }

}
