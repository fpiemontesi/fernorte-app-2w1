import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requestInvoiceDto } from '../models/requestInvoiceDTO';
import {  InvoiceDto } from '../models/InvoiceDto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  request?: requestInvoiceDto;
  invoices: InvoiceDto[] = [];

  newInvoice?: Invoice;
  totalPay: number = 0;

  constructor(private http: HttpClient) { }

  loadInvoice(body: requestInvoiceDto): Observable<requestInvoiceDto> {
    return this.http.post<requestInvoiceDto>('https://api.example.com/data', body);
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('http://localhost:8080/api/v1/invoice/all');
  }

  setRequest(req:requestInvoiceDto){
    this.request = req;
  }
  setTotalpay(num:number){
    this.totalPay = num;
  }
  getTotalpay(){
    return this.totalPay;
  }
}
