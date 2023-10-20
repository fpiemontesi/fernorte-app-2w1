import { Component ,ViewChild, ElementRef} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'fn-home-invoice',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activeIndex: number = 0; //

  items = [
    { text: 'Consulta Pedidos' },
    { text: 'Registrar Factura' },
    { text: 'Gestionar Facturas' },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
}
