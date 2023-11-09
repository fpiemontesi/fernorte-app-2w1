import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedor } from 'src/app/modules/purchase/models/Proveedor';



@Component({
  selector: 'fn-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) {}

  proveedor: Proveedor = new Proveedor("","","","","","","",""); // Crea una instancia del modelo de Proveedor

  onSubmit() {
    // Aquí puedes enviar los datos del proveedor al servidor o realizar otras acciones
    console.log('Proveedor cargado:', this.proveedor);
    this.activeModal.close();
  }
}
