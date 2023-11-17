
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { CrearComponent } from '../modals/crear/crear.component';
import { EliminarComponent } from '../modals/eliminar/eliminar.component';
import { ModificarComponent } from '../modals/modificar/modificar.component';
import { ModalCatalogoProveedoresComponent } from '../modals/catalogo/modal-catalogo-proveedores.component';

@Component({
  selector: 'fn-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  constructor(private modalService: NgbModal){}
  openModalAlta() {
    const modalRef = this.modalService.open(CrearComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }
  openModalBaja() {
    const modalRef = this.modalService.open(EliminarComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }
  openModalEditar() {
    const modalRef = this.modalService.open(ModificarComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }
  openCatalogo() {
    const modalRef = this.modalService.open(ModalCatalogoProveedoresComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    
  }

  provedores=[
    {
      nombre : "EASY",
      CUIT : "154821333",
      IVA : "Responsable inscripto",
      Ubicacion : "av Colon 1000, Capital",
      Provincia:"Cordoba",
      Telefono :"351266489",
      Email:"ventas@easy.com"
    },
    {
      nombre : "Ferrocons",
      CUIT : "145981333",
      IVA : "Responsable inscripto",
      Ubicacion : "colectora ruta 20, Capital",
      Provincia:"Cordoba",
      Telefono :"351266489",
      Email:"ventas@ferrocons.com"
    }
  ]

}
