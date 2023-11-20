import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";


@Component({
  selector: 'fn-home-inventory',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  active = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if(this.router.url === "/inventory") {
          this.active = "";
          console.log(this.active);
        }
      });
  }
}
