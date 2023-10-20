import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { requestInvoiceDto } from '../models/requestInvoiceDTO';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  request?: requestInvoiceDto;

  constructor(private http: HttpClient) { }

  actualizar(body: requestInvoiceDto): Observable<requestInvoiceDto> {
    return this.http.put<requestInvoiceDto>('https://api.example.com/data', body);
  }
}
