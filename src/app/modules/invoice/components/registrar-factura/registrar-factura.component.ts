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
    const nroDocInput = document.getElementById('nroDoc') as HTMLInputElement;
    const domicilioInput = document.getElementById('domicilio') as HTMLInputElement;
    const tipoClienteInput = document.getElementById('tipoCliente') as HTMLSelectElement;
    const tipoDniInput = document.getElementById('tipoDni') as HTMLSelectElement;
    const fechaFacturaInput = document.getElementById('fechaFactura') as HTMLInputElement;
    const clienteInput = document.getElementById('nombreCliente') as HTMLInputElement;
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

        nroDocInput.value = this.clientSelected?.nro_doc?.toString() || "";  // Valor por defecto: ""
        domicilioInput.value = this.clientSelected?.domicilio || "Cargar Domicilio";
        clienteInput.value = this.clientSelected?.nombre + " " + this.clientSelected?.apellido;
        tipoClienteInput.value = this.clientSelected?.id_tipo_cliente?.tipo_cliente || "";
        tipoDniInput.value = this.clientSelected?.id_tipo_doc?.tipo_documento || "";
        fechaFacturaInput.value = formattedDate.toString();

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
  realizarPago(){

  }
}
