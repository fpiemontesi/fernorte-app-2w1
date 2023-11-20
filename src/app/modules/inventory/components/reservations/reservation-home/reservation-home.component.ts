import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-home',
  templateUrl: './reservation-home.component.html',
  styleUrls: ['./reservation-home.component.css']
})
export class ReservationHomeComponent implements OnInit {
  active = -1;

  constructor() { }

  ngOnInit() {
  }

}
