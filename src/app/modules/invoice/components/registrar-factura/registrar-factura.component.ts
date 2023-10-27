import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Detail } from '../../models/Detail';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'fn-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent {
  orderSelected: Order | undefined;
  details: Detail[] | undefined;
  totalPedido: number | undefined;

  constructor(private orderService: OrderService, private invoiceservice: InvoiceService) {
    this.orderSelected = this.orderService.getOrderSelected();
    this.details = this.orderSelected?.detalles;
    this.totalPedido = 0; // Inicializa totalPedido a 0

    if (this.details) {
      this.details.forEach(element => {
        this.totalPedido! += element.cantidad * element.precioUnitario;
        element.subtotal = element.cantidad * element.precioUnitario;
      });
      invoiceservice.setTotalpay(this.totalPedido);

    }
  }

  volver() {
    
  }
}
