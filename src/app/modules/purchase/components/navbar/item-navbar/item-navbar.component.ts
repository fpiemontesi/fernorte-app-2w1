import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-navbar',
  templateUrl: './item-navbar.component.html',
  styleUrls: ['./item-navbar.component.css']
})
export class NavbarItemComponent implements OnInit {

  @Input() nombreItem : string = "";
  @Input() link : string = "";

  constructor() { }

  ngOnInit() {
  }

}
