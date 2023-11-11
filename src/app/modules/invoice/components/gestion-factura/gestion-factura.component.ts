import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDto } from '../../models/InvoiceDto';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css']
})
export class GestionFacturaComponent {


  invoices: InvoiceDto[] = []; // Declarar una variable para almacenar las facturas

  constructor(private invoiceService: InvoiceService) { 

  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(
      (response: InvoiceDto[]) => {
        this.invoices = response;
        console.log(this.invoices);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
