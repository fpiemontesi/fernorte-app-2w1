import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PayDetailDTO } from '../models/pay-detail-dto';
import { PaymentMethodDTO } from '../models/payment-method-dto';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private apiUrl = 'http://localhost:8081/api/v1/paymentMethods';
  listpayment?: PaymentMethodDTO[] = [];

  private paidListSubject = new BehaviorSubject<PayDetailDTO[]>([]);
  paidList$ = this.paidListSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  obtenerFormasPago(): Observable<PaymentMethodDTO[]> {
    return this.http.get<PaymentMethodDTO[]>(this.apiUrl);
  }

  setListPaids(list: PayDetailDTO[]) {
    this.paidListSubject.next(list); // Emite la nueva lista de pagos
  }

  getListPaids() {
    return this.paidListSubject.getValue(); // Obtiene el valor actual sin notificar
  }

  getPaidsObservable(): Observable<PayDetailDTO[]> {
    return this.paidList$; // Devuelve el Observable para suscribirse a los cambios
  }

  addPay(pay: PaymentMethodDTO) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };
    console.log(pay)
    return this.http.post<PaymentMethodDTO>(this.apiUrl + '/' + pay.name, httpOptions);
  }
}
