import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-sales',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarVenta: boolean = false;
  mostrarPresupuesto: boolean = false;

  AltaVenta() {
      this.mostrarVenta = !this.mostrarVenta;
  }

  AltaPresupuesto() {
    this.mostrarPresupuesto = !this.mostrarPresupuesto;
  }
}
