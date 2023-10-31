import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://my-json-server.typicode.com/113843-Decicco-Giovanni/ventas/ventas';
  orders: Order[] = [];

  orderSelected?: Order;
  constructor(private http: HttpClient) {
  }

  obtenerOrdenes():Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  setOrderSelected(or:Order){
    this.orderSelected = or;
  }

  getOrderSelected(){
    return this.orderSelected;
  }
}
