import { Component } from '@angular/core';
import { Remito } from '../../../models/Remito';
import { NgForm } from '@angular/forms';
import { DetalleRemito } from '../../../models/DetalleRemito';

@Component({
  selector: 'fn-registrar-remito',
  templateUrl: './registrar-remito.component.html',
  styleUrls: ['./registrar-remito.component.css']
})
export class RegistrarRemitoComponent {
  remitos: Remito[] = [];
  remito: Remito = new Remito();
  detalle: DetalleRemito = new DetalleRemito();

  agregarRemito(form: NgForm) {
    if (form.valid) {
      const nuevoDetalle: DetalleRemito = new DetalleRemito();
      nuevoDetalle.cantidad = this.detalle.cantidad;
      nuevoDetalle.nombreProducto = this.detalle.nombreProducto;
      nuevoDetalle.detalle = this.detalle.detalle;

      this.remito.detalles.push(nuevoDetalle);
      this.detalle = new DetalleRemito(); 
    } else {
      alert('Datos ingresados son inválidos');
    }
  }


  eliminarDetalle(index: number) {
    this.remito.detalles.splice(index, 1);
  }
}
