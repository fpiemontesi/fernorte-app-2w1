import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requestInvoiceDto } from '../models/requestInvoiceDTO';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  request?: requestInvoiceDto;
  invoices: Invoice[] = [];

  constructor(private http: HttpClient) { }

  actualizar(body: requestInvoiceDto): Observable<requestInvoiceDto> {
    return this.http.put<requestInvoiceDto>('https://api.example.com/data', body);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('http://localhost:8080/api/v1/invoice/all');
  }
}
