import { Component } from '@angular/core';

import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDto } from '../../models/InvoiceDto';
import { ToastService } from '../../services/toast.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css'],
})
export class GestionFacturaComponent {
  onSubmit() {
    console.log(this.filterForm.value);
    this.invoiceService
      .getInvoicesFiltered(
        this.filterForm.value.dateFrom,
        this.filterForm.value.dateTo,
        this.filterForm.value.client
      )
      .subscribe({
        next: (response: InvoiceDto[]) => {
          this.invoices = response;
          console.log(response);
        },
        error: () => {
          this.toastService.show('Error al obtener las facturas', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        },
      });
  }
  invoices: InvoiceDto[] = []; // Declarar una variable para almacenar las facturas

  private subscription = new Subscription();
  filterForm: FormGroup;

  constructor(
    private invoiceService: InvoiceService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      client: [''],
    });
  }

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
