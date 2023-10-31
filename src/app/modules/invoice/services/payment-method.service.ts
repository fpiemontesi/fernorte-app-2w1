import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment-method';
import { Payment } from '../models/payment'; //test
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { payDetailDTO } from '../models/payDetailDTO';
import { paymentMethodDTO } from '../models/paymentMethodDTO';

@Injectable({
  providedIn: 'any'
})
export class PaymentMethodService {

  private apiUrl = 'http://localhost:8081/paymentMethods';
  listpayment?: paymentMethodDTO[] = [];


  paidList:payDetailDTO[] = [];

  constructor(private http: HttpClient) {
  }

  obtenerFormasPago():Observable<paymentMethodDTO[]> {
    return this.http.get<paymentMethodDTO[]>(this.apiUrl);
  }
  setListPaids(list:payDetailDTO[]){
    this.paidList = list;
  }

  getListPaids(){
    return this.paidList;
  }
  
}
