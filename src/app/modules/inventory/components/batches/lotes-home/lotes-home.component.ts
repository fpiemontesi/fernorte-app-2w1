import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'fn-lotes-home',
  templateUrl: './lotes-home.component.html',
  styleUrls: ['./lotes-home.component.css']
})
export class LotesHomeComponent {

  active = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if(this.router.url === "lotes") {
          this.active = "";
          console.log(this.active);
        }
      });
  }
}
