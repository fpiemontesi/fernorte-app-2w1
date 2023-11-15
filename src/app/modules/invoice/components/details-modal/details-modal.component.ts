import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedDataInvoiceService } from '../../services/shared-data-invoice.service';
import { InvoiceDetail } from '../../models/InvoiceDetail';

@Component({
  selector: 'fn-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  DetailInvoice:InvoiceDetail[] = []
  invoiceDetailPresent:boolean = false;

  closeModal(){
    this.invoiceDetailPresent = false
  }

  constructor(private sharedDataInvoice:SharedDataInvoiceService,){
    
  }

  ngOnInit(){
    this.sharedDataInvoice.InvoiceDetailData$.subscribe((detailInvoice)=>
    {
      this.DetailInvoice = detailInvoice
      this.invoiceDetailPresent = true;
      console.log(detailInvoice)
    })  
  }



}
