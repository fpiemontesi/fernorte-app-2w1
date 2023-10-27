import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'fn-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent {
  @Input() order: Order = new Order();

  realizarPago() {
    console.log(this.order);
  }
}
