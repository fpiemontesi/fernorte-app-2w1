import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../models/Invoice';
import { InvoiceDetail } from '../models/InvoiceDetail';

@Injectable({
  providedIn: 'root'
})
export class SharedDataInvoiceService {

  private invoiceData = new BehaviorSubject<any>(null);
  private invoiceDetailData = new BehaviorSubject<any>(null);
  InvoiceData$ = this.invoiceData.asObservable();
  InvoiceDetailData$ = this.invoiceDetailData.asObservable();
  
  setInvoiceData(data: Invoice) {
    this.invoiceData.next(data);
  }

  setDetailInvoice(data:InvoiceDetail[]){
    this.invoiceDetailData.next(data);
  }

  
}
