import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from '../../models/Proveedor';

@Component({
  selector: 'fn-modal-componentbaja',
  templateUrl: './modal-componentbaja.component.html',
  styleUrls: ['./modal-componentbaja.component.css']
})
export class ModalComponentbajaComponent {
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  proveedor: Proveedor = new Proveedor("","","","","","","",""); //
  onSubmit() {
    // Aquí puedes enviar los datos del proveedor al servidor o realizar otras acciones
    console.log('Proveedor cargado:', this.proveedor);
    this.activeModal.close();
  }
}
