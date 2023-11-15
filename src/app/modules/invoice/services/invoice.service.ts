import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InvoiceDto } from '../models/InvoiceDto';
import { Invoice } from '../models/Invoice';
import { FormGroup } from '@angular/forms';
import { RequestInvoiceDto } from '../models/requestInvoiceDTO';
import { Detail } from '../models/Detail';
import { InvoiceDetail } from '../models/InvoiceDetail';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  newInvoice?: InvoiceDto;
  totalPay: number = 0;

  requestInvoice?: RequestInvoiceDto;

  constructor(private http: HttpClient) { }

  loadInvoice(body: RequestInvoiceDto): Observable<RequestInvoiceDto> {
    return this.http.post<RequestInvoiceDto>(
      'https://api.example.com/data',
      body
    );
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(
      'http://localhost:8081/api/v1/invoice/all'
    );
  }
  getInvoicesFiltered(
    dateFrom: string,
    dateTo: string,
    client: string
  ): Observable<InvoiceDto[]> {
    let params = new HttpParams()
      .set('dateFrom', dateFrom)
      .set('dateTo', dateTo)
      .set('clientId', client);

    let rta: Observable<InvoiceDto[]> = this.http.get<InvoiceDto[]>(
      'http://localhost:8081/api/v1/invoice/all/filtered',
      { params: params }
    );
    rta.subscribe((data) => {
      console.log(data);
    });
    return rta;
  }

  setTotalpay(num: number) {
    this.totalPay = num;
  }
  getTotalpay() {
    return this.totalPay;
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      'http://localhost:8081/api/v1/invoice',
      invoice
    );
  }

  deleteInvoice(id_invoice:number) :Observable<any>{
    const apiUrl = 'http://localhost:8081/api/v1/invoice';
    const url = `${apiUrl}/delete/${id_invoice}`;
    return this.http.put(url,{})
  }

  getDetailInvoices(id_invoice:number):Observable<InvoiceDetail[]>{
    return this.http.get<InvoiceDetail[]>('http://localhost:8081/api/v1/invoice/details/' + id_invoice)
  }
}
