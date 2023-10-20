import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment-method';
import { Payment } from '../models/payment'; //test
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor() {  }

  listarFormas() { //test funcionalidad componente, se cambiara por metodo get()
    return this.lista;
  }

  // constructor(private http : HttpClient) { }

  // get(): Observable<PaymentMethod[]> {
  //   return this.http.get<PaymentMethod[]>(''); //api tabla formas_de_pago
  // }

  
}
