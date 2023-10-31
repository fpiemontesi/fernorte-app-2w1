import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-sales',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarVenta: boolean = false;
  mostrarPresupuesto: boolean = false;

  mostrarAltaVenta: boolean = false;
  mostrarConsultaPresupuesto: boolean = false;
  mostrarConsultaVenta: boolean = false;
  mostrarAltaPresupuesto:boolean = false;

  MenuVenta(event : Event) {
      event.preventDefault();
      this.mostrarVenta = !this.mostrarVenta;
      this.mostrarPresupuesto = false;
  }

  MenuPresupuesto(event:Event) {
    event.preventDefault();
    this.mostrarPresupuesto = !this.mostrarPresupuesto;
    this.mostrarVenta = false;
  }

  MostrarComponente(componente:string) {
    this.mostrarConsultaPresupuesto = componente === 'consultarPresupuesto';
    this.mostrarConsultaVenta = componente === 'consultarVenta';
    this.mostrarAltaPresupuesto = componente === 'altaPresupuesto'
  }
}
