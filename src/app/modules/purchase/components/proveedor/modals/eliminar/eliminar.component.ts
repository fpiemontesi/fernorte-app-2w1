import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/modules/purchase/models/Proveedor';

@Component({
  selector: 'fn-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {
  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  proveedor: Proveedor = new Proveedor("","","","","","","",""); //
  onSubmit() {
    // Aquí puedes enviar los datos del proveedor al servidor o realizar otras acciones
    console.log('Proveedor cargado:', this.proveedor);
    this.activeModal.close();
  }
}
