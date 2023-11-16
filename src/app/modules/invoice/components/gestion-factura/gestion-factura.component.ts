import { Component } from '@angular/core';

import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDto } from '../../models/InvoiceDto';
import { ToastService } from '../../services/toast.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';
import { InvoiceDetail } from '../../models/InvoiceDetail';

@Component({
  selector: 'fn-gestion-factura',
  templateUrl: './gestion-factura.component.html',
  styleUrls: ['./gestion-factura.component.css'],
})
export class GestionFacturaComponent {



  invoices: InvoiceDto[] = []; // Declarar una variable para almacenar las facturas

  private subscription = new Subscription();
  filterForm: FormGroup;

  constructor(
    private invoiceService: InvoiceService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private sharedDataInvoice:SharedDataInvoiceService
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

  onSubmit() {
    this.invoiceService
      .getInvoicesFiltered(this.filterForm.value.dateFrom,
        this.filterForm.value.dateTo,
        this.filterForm.value.client)
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
  deleteFactura(id_invoice:number){
    this.invoiceService.deleteInvoice(id_invoice).subscribe((result)=>
    {
      console.log(result);
    })
  }

  obtenerDetalles(id_invoice:number){
    this.invoiceService.getDetailInvoices(id_invoice).subscribe((result) =>{
      
      for(let i of result){
        i.subTotal = i.price * i.count;
      }

      console.log(result)
     
      this.modalService.open(DetailsModalComponent, {
        size: 'lg',
      });
      this.sharedDataInvoice.setDetailInvoice(result)
      
    })
  }

 

  public searchInvoices() {
    // Realiza la búsqueda de facturas utilizando los valores actuales del formulario
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
  getPdf(id:number) {
    try {
      this.invoiceService.generateInvoicePdf(id).subscribe(
        (blob: Blob) => {
          this.toastService.show('Pdf de factura generado', {
            classname: 'bg-success text-light',
            delay: 15000,
          })
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        (error) => {
          this.toastService.show('Error al generar el pdf', {
            classname: 'bg-danger text-light',
            delay: 15000,
          });
        }
      );
    } catch (error) {
      this.toastService.show('Error al generar el pdf', {
        classname: 'bg-danger text-light',
        delay: 15000,
      });
  }
}



}
