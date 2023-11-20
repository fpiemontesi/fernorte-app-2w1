import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import { flip } from '@popperjs/core';
@Component({
  selector: 'fn-home-inventory',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  active = "";

  constructor(private router: Router) {
    console.log( this.active)
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        if(this.router.url === "/inventory") {
          this.active = "";
          console.log(this.active);
        }
      });
  }
}