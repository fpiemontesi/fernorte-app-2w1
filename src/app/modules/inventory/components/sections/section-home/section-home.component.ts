import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-home',
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.css']
})
export class SectionHomeComponent implements OnInit {
  activeId = -1;

  constructor() { }

  ngOnInit() {
  }

}
