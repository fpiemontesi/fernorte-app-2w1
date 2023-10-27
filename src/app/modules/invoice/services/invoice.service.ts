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

  constructor(private http: HttpClient) { }

  actualizar(body: requestInvoiceDto): Observable<requestInvoiceDto> {
    return this.http.put<requestInvoiceDto>('https://api.example.com/data', body);
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('http://localhost:8080/api/v1/invoice/all');
  }
}
