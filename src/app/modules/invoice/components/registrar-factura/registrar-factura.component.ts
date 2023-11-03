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
registerLocaleData(localeEs);

@Component({
  selector: 'fn-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent {
  orderSelected: Order | undefined;
  //array de detalles de la factura
  details: Detail[] | undefined;
  discounts: DiscountDTO[] | undefined;
  totalPedido: number = 0;
  clients?: Client[] = [];
  clientSelected?: Client;
  // Obtener elementos del DOM y castearlos al tipo adecuado
  nombreCliente?: string;
  fechaFactura?: string;
  tipoDni?: string;
  tipoCliente?: string;
  nroDoc?: string;
  domicilio?: string;


  constructor(private orderService: OrderService, private invoiceservice: InvoiceService, private customerserv: CustomerService) {
    //cargamos las variables con los servicios ordenseleccionada, detalles, descuentos
    this.orderSelected = this.orderService.getOrderSelected();
    this.details = this.orderSelected?.detalles;
    this.discounts = this.orderSelected?.descuentos;
    invoiceservice.setTotalpay(this.orderSelected!.total);


    this.totalPedido = invoiceservice.getTotalpay();
    if (this.details) {
      this.details.forEach(element => {
        //EL TOFIXED REDONDEA 2 CIFRAS
        const subtotal = (element.cantidad * element.precioUnitario).toFixed(2);
        //CONVERTIMOS A NUMERO
        element.subtotal = parseFloat(subtotal);
      });
      invoiceservice.setTotalpay(this.totalPedido);
    }
    this.calculateDiscounted();


  }
  ngOnInit() {
  
    //cargamos los clientes[] desde la api
    this.customerserv.obtenerCliente().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log("esta es la response de clientes", response);
        console.log("esta es clients", this.clients);

        // Ahora buscamos el cliente en el array de clientes
        const clienteEncontrado = this.clients?.find(c => c.id === this.orderSelected?.idCliente);
        console.log("idcliente orden", this.orderSelected?.idCliente);
        console.log("cliente encontrado", clienteEncontrado);
        //si existe el cliente en el array lo guardamos en el seleccionado sino advertimos que no existe
        if (clienteEncontrado) {
          this.clientSelected = clienteEncontrado
        } else {
          alert("Cliente no existe");

        }
        const date = new Date();
        const formattedDate = formatDate(date, 'dd-MM-yyyy', 'es'); // El tercer argumento es el código de localización ('es' para español).
        console.log(formattedDate);

        this.nroDoc= this.clientSelected?.nro_doc?.toString() || "";  // Valor por defecto: ""
        this.domicilio = this.clientSelected?.domicilio || "Cargar Domicilio";
        this.nombreCliente = this.clientSelected?.nombre + " " + this.clientSelected?.apellido;
        this.tipoCliente = this.clientSelected?.id_tipo_cliente?.tipo_cliente || "";
        this.tipoDni = this.clientSelected?.id_tipo_doc?.tipo_documento || "";
        this.fechaFactura = formattedDate.toString();

      },
      (error: any) => {
        console.error(error);
      });



    console.log("discounts: ", this.discounts)
    console.log("discounts this.order: ", this.orderSelected?.descuentos)



  }

  calculateDiscounted() {
    if (this.discounts) {
      this.discounts.forEach(element => {
        element.discounted = (this.totalPedido * element.porcentage!) / 100;
      });
    }
  }
  realizarPago() {

  }
}
