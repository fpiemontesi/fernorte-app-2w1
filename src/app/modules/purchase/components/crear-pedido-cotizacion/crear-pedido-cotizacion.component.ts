import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-crear-pedido-cotizacion',
  templateUrl: './crear-pedido-cotizacion.component.html',
  styleUrls: ['./crear-pedido-cotizacion.component.css']
})
export class CrearPedidoCotizacionComponent {
  nuevoDato = { producto: '', cantidad: 0};
  productos: string[] = [
    'Martillo',
    'Destornillador',
    'Tornillos',
    'Clavos',
    'Cinta métrica',
    'Sierra',
    'Llave ajustable',
    'Brocas',
    'Nivel',
    'Alicates',
    'Llave inglesa',
    'Pegamento',
    'Cautín',
    'Pala',
    'Cepillo de alambre',
    'Cerraduras',
    'Cadenas',
    'Taladro',
    'Lijadora',
    'Cuchilla de carpintero',
  ];

  datos: any[] = [];
  @ViewChild('formulario') formulario: NgForm;
  constructor() {
    this.formulario = {} as NgForm; }

  agregarDato() {
      this.datos.push({ ...this.nuevoDato });
      this.nuevoDato = { producto: '', cantidad: 0};
      this.formulario.resetForm();
  }
  aumentarCantidad(index: number) {
    if (this.datos[index].cantidad < 999) {
      this.datos[index].cantidad++;
    }
  }

  disminuirCantidad(index: number) {
    if (this.datos[index].cantidad > 1) {
      this.datos[index].cantidad--;
    }
  }

}
