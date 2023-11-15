import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class SharedOrdenDetailService {
  
  private orderData = new BehaviorSubject<any>(null);

  OrderData$ = this.orderData.asObservable();
  
  setInvoiceData(data:Order) {
    this.orderData.next(data);
  }

}
