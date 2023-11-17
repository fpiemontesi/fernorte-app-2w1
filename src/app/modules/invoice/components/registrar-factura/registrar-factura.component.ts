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
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarPagoComponent } from '../registrar-pago/registrar-pago.component';
import { Observable, tap } from 'rxjs';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';
import {
  DiscountRequest,
  Invoice,
  OrderDetail,
  Product,
} from '../../models/Invoice';
import { InvoiceDto } from '../../models/InvoiceDto';
import { ToastService } from '../../services/toast.service';
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
  client: Client[] = [];
  id: number = 0;
  fechaHoy: Date = new Date();
  invoice: Invoice = new Invoice();
  tipoFactura: string = 'A';
  invoices: InvoiceDto[] = [];
  nroFactura: number = 0;
  paid: boolean = false;

  client$?: Observable<Client[]>;

  constructor(
    private orderService: OrderService,
    private invoiceservice: InvoiceService,
    private customerserv: CustomerService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private sharedDataInvoice: SharedDataInvoiceService,
    private toastService: ToastService,
    private routeService: Router
  ) {


  }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    this.orderSelected = this.orderService.getOrderSelected();

    this.client$ = this.customerserv.obtenerClienteByNroDoc(this.orderSelected.doc_cliente);
    this.customerserv
      .obtenerClienteByNroDoc(this.orderSelected.doc_cliente)
      .subscribe((data) => {
        this.client = data;

      });


    this.invoiceservice.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;

        // Encuentra el ID más alto usando reduce
        const highestId = this.invoices.reduce((maxId, invoice) => {
          return (invoice.id > maxId) ? invoice.id : maxId;
        }, 0);
        this.nroFactura = highestId + 1;
  
      });
      this.sharedDataInvoice.InvoicePayments$.subscribe((invoicePayments: any) => {
        this.paid = !this.paid;
        this.invoice.paymentMethodList = invoicePayments;
      });
  }

  
  registrarFactura() {
    console.log(" this.invoice",this.invoice);
    this.invoiceservice.createInvoice(this.invoice).subscribe({
      next: (response) => {
        this.toastService.show('Factura registrada', {
          classname: 'bg-success text-light',
          delay: 5000,
        })
        this.delayedNavigate(['ConsultarPedidos'], 2000);
      },
      error: (error) => {
        this.toastService.show('Error al registrar la Factura', {
          classname: 'bg-danger text-light',
          delay: 5000,
        })
      },
    });
   } 

   delayedNavigate(route: string[], delayTime: number) {
    setTimeout(() => {
      this.routeService.navigate(route);
    }, delayTime);
  }

  obtenerInvoiceData() {
    this.invoice.orderId = this.orderSelected.id;
    this.invoice.clientId = 87654321; //this.orderSelected.idCliente
    this.invoice.type = this.tipoFactura;
    this.invoice.status = 'PENDING';
    this.invoice.iva = 0.21;
    this.invoice.reservationId = this.orderSelected.id_reserva;

    let listDiscount: DiscountRequest[] = [];
    //CREO LA LISTA DE DESCUENTOS
    for (let discount of this.orderSelected.descuentos) {
      let discountRequest: DiscountRequest = new DiscountRequest();
      discountRequest.monto = discount.monto;
      discountRequest.description = discount.descripcion;
      listDiscount.push(discountRequest);
    }
    this.invoice.discountRequestList = listDiscount;

    //CREO LA LISTA DE DETALLES
    let listDetail: OrderDetail[] = [];
    for (let detail of this.orderSelected.detalles) {
      let producto: Product = new Product();
      let detalleOrden: OrderDetail = new OrderDetail();

      //CREO EL PRODUCTO
      producto.product_id = detail.cod_prod;
      producto.name = detail.descripcion;
      producto.price = detail.precio_unitario;

      //CREO EL DETALLE
      detalleOrden.product = producto;
      detalleOrden.amount = detail.cantidad;
      detalleOrden.measurementUnit = '';
      listDetail.push(detalleOrden);
    }

    this.invoice.details = listDetail;

    this.sharedDataInvoice.setInvoiceData(this.invoice);
  }
}
