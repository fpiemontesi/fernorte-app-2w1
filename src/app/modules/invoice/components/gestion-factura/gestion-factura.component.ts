import { Component } from '@angular/core';

import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDto } from '../../models/InvoiceDto';
import { ToastService } from '../../services/toast.service';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css'],
})
export class GestionFacturaComponent {
  invoices: InvoiceDto[] = []; // Declarar una variable para almacenar las facturas

  private subscription = new Subscription();

  constructor(
    private invoiceService: InvoiceService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const listInvoices = this.invoiceService.getInvoices();

    this.subscription.add(
      listInvoices.subscribe({
        next: (response: InvoiceDto[]) => {
          this.invoices = response;
          console.log(this.invoices);
        },
        error: () => {
          this.toastService.show('Error al obtener las facturas', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        },
      })
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
