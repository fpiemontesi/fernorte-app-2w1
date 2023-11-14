import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestInvoiceDto } from '../models/RequestInvoiceDTO';
import { InvoiceDto } from '../models/InvoiceDto';
import { Invoice } from '../models/Invoice';




@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  

  newInvoice?: InvoiceDto;
  totalPay: number = 0;

  requestInvoice?: RequestInvoiceDto;

  constructor(private http: HttpClient) { }

  loadInvoice(body: RequestInvoiceDto): Observable<RequestInvoiceDto> {
    return this.http.post<RequestInvoiceDto>('https://api.example.com/data', body);
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('http://localhost:8080/api/v1/invoice/all');
  }

  setTotalpay(num: number) {
    this.totalPay = num;
  }
  getTotalpay() {
    return this.totalPay;
  }

  createInvoice(invoice:Invoice) :Observable<Invoice>{
    return this.http.post<Invoice> ("http://localhost:8081/api/v1/invoice",invoice)
  }


}
