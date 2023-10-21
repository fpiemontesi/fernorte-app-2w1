import { Component ,ViewChild, ElementRef} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DolarServiceService } from '../../services/dolar-service.service';
import { Dolar } from '../../models/Dolar';
import { Order } from '../../models/order';
@Component({
  selector: 'fn-home-invoice',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dolar?: number;
  orden: Order = new Order();

  constructor(private dola:DolarServiceService) { }
  
  ngOnInit() {
 
    
    this.dola.obtenerDolar().subscribe((dol: Dolar) => {
      this.dolar = dol.venta; // Asignar el valor de compra del objeto Dolar
    });
  }

  activeIndex: number = 0; //

  items = [
    { text: 'Consulta Pedidos' },
    { text: 'Registrar Factura' },
    { text: 'Gestionar Facturas' },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
  facturarorden(order: Order) {
    this.orden = order;
    console.log("BORRAR",order)
    this.activeIndex = 1;

 


   
  }
}
