import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class SharedDataInvoiceService {

  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  setInvoiceData(data: Invoice) {
    this.formDataSubject.next(data);
  }

  
}
