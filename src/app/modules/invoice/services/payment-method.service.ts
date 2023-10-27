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

  // test funcionalidad componente
  private lista: PaymentMethod[] = [
    {
      idMethod: 1,
      paymentMethod: "Credito"
    },
    {
      idMethod: 2,
      paymentMethod: "Debito"
    },
    {
      idMethod: 3,
      paymentMethod: "Efectivo"
    }
  ];

  listarFormas() { //test funcionalidad componente, se cambiara por metodo get()
    return this.lista;
  }

  // constructor(private http : HttpClient) { }

  // get(): Observable<PaymentMethod[]> {
  //   return this.http.get<PaymentMethod[]>(''); //api tabla formas_de_pago
  // }
  private apiUrl = 'http://localhost:8080/paymentMethods';
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
