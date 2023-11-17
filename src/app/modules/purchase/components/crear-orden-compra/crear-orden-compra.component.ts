import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-crear-orden-compra',
  templateUrl: './crear-orden-compra.component.html',
  styleUrls: ['./crear-orden-compra.component.css']
})
export class CrearOrdenCompraComponent {
  nuevoDato = { producto: '', cantidad: 0, precio: 0};
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
      this.nuevoDato = { producto: '', cantidad: 0, precio:0};
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

  calcularTotalOrden(): number {
    let totalOrden = 0;
  
    this.datos.forEach(dato => {
      totalOrden += dato.precio * dato.cantidad;
    });
  
    return totalOrden;
  }

}
