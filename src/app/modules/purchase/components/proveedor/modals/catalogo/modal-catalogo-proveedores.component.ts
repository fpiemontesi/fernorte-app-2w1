import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-modal-catalogo-proveedores',
  templateUrl: './modal-catalogo-proveedores.component.html',
  styleUrls: ['./modal-catalogo-proveedores.component.css']
})
export class ModalCatalogoProveedoresComponent {

  catalogoProveedores = [
    {
      producto: "Taladro percutor",
      detalle: "Herramienta esencial para perforar agujeros en concreto, ladrillo u otros materiales duros.",
      precio: 1500.00,
      marca: "Perst"
    },
    {
      producto: "Brocas para concreto",
      detalle: "Juego de brocas diseñadas específicamente para perforar agujeros en concreto.",
      precio: 2005.50,
      marca: "Master"
    },
    {
      producto: "Martillo percutor",
      detalle: "Herramienta útil para trabajos de demolición o para insertar anclajes en el concreto.",
      precio: 7005.00,
      marca: "Force"
    },
    {
      producto: "Nivel de burbuja",
      detalle: "Instrumento para asegurarse de que las columnas estén niveladas y a plomo.",
      precio: 1200.99,
      marca: "Level"
    },
    {
      producto: "Anclajes y tornillos para concreto",
      detalle: "Elementos de fijación diseñados específicamente para su uso en concreto.",
      precio: 800.50,
      marca: "Fix"
    }
  ]

  eliminarProducto(index: number) {
    this.catalogoProveedores.splice(index, 1);
  }


  mostrarFormulario = false;
  nuevoProducto = { producto: '', detalle: '', precio: 0, marca: '' };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarProducto() {
    this.catalogoProveedores.push(this.nuevoProducto);
    this.nuevoProducto = { producto: '', detalle: '', precio: 0, marca: '' };
    this.toggleFormulario();
  }


}
