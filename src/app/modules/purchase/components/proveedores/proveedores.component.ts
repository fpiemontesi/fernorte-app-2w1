import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ModalComponentbajaComponent } from '../modal-componentbaja/modal-componentbaja.component';
import { ModalComponenteditarComponent } from '../modal-componenteditar/modal-componenteditar.component';

@Component({
  selector: 'fn-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  constructor(private modalService: NgbModal){}
  openModalAlta() {
    const modalRef = this.modalService.open(ModalComponentComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }
  openModalBaja() {
    const modalRef = this.modalService.open(ModalComponentbajaComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }
  openModalEditar() {
    const modalRef = this.modalService.open(ModalComponenteditarComponent);
    // Puedes configurar el modal aquí, por ejemplo:
    modalRef.componentInstance.data = '';
  }

}
