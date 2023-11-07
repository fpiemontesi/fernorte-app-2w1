import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Detail } from '../../models/Detail';
import { InvoiceService } from '../../services/invoice.service';
import { Client } from '../../models/Clients/Client';
import { CustomerService } from '../../services/customer.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DiscountDTO } from '../../models/DiscountDTO';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarPagoComponent } from '../registrar-pago/registrar-pago.component';
registerLocaleData(localeEs);

@Component({
  selector: 'fn-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent {
  openModal() {
    const modalRef = this.modalService.open(RegistrarPagoComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.invoiceTotal = this.orderSelected.total;
  }
  orderSelected: Order = new Order();
  client: Client = new Client();
  id: number = 0;
  fechaHoy: Date = new Date();
  constructor(
    private orderService: OrderService,
    private invoiceservice: InvoiceService,
    private customerserv: CustomerService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.orderSelected = this.orderService.getOrderSelected();

    this.customerserv
      .obtenerClienteById(this.orderSelected.idCliente)
      .subscribe((data) => {
        console.log(data);
        this.client = data;
        console.log(this.client);
      });
  }
  realizarPago() {}
}
