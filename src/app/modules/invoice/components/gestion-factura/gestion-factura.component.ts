import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Invoice } from '../../models/Invoice';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css']
})
export class GestionFacturaComponent {


  invoices: Invoice[] = []; // Declarar una variable para almacenar las facturas

  constructor(private invoiceService: InvoiceService) { 

  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(
      (response: Invoice[]) => {
        this.invoices = response;
        console.log(this.invoices);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
