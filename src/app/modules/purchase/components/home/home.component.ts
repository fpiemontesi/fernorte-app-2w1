import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-purchase',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarComponente: boolean = false;

  mostrarMiComponente() {
    this.mostrarComponente = !this.mostrarComponente;
  }
}
