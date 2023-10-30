import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from '../../../models/Proveedor';


@Component({
  selector: 'fn-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  proveedor: Proveedor = new Proveedor("","","","","","","",""); // Crea una instancia del modelo de Proveedor

  onSubmit() {
    // Aquí puedes enviar los datos del proveedor al servidor o realizar otras acciones
    console.log('Proveedor cargado:', this.proveedor);
    this.activeModal.close();
  }
}
