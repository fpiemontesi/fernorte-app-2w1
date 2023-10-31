import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Detail } from '../../models/Detail';
import { InvoiceService } from '../../services/invoice.service';
import { DiscountDTO } from '../../models/DiscountDTO';

@Component({
  selector: 'fn-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent {
  orderSelected: Order | undefined;
  details: Detail[] | undefined;
  discounts: DiscountDTO[] | undefined; 
  totalPedido: number =0;

  constructor(private orderService: OrderService, private invoiceservice: InvoiceService) {
    this.orderSelected = this.orderService.getOrderSelected();
    this.details = this.orderSelected?.detalles;
    this.discounts = this.orderSelected?.descuentos;
    console.log("discounts: ", this.discounts)
    console.log("discounts this.order: ", this.orderSelected?.descuentos)
    this.totalPedido = 0; 
    if (this.details) {
      this.totalPedido! += this.orderSelected?.total || 0;
      this.details.forEach(element => {
        element.subtotal = element.cantidad * element.precioUnitario;
      });
      invoiceservice.setTotalpay(this.totalPedido);
    }
    this.calculateDiscounted();
  }

  calculateDiscounted() {
    if (this.discounts) {
      this.discounts.forEach(element => {
        element.discounted = (element.porcentaje / 100) * this.totalPedido;
      });
    }
  }
  

  volver() {
    
  }
}
