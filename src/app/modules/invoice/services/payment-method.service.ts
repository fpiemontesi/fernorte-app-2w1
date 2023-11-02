import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { payDetailDTO } from '../models/payDetailDTO';
import { paymentMethodDTO } from '../models/paymentMethodDTO';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private apiUrl = 'http://localhost:8081/paymentMethods';
  listpayment?: paymentMethodDTO[] = [];

  private paidListSubject = new BehaviorSubject<payDetailDTO[]>([]);
  paidList$ = this.paidListSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  obtenerFormasPago(): Observable<paymentMethodDTO[]> {
    return this.http.get<paymentMethodDTO[]>(this.apiUrl);
  }

  setListPaids(list: payDetailDTO[]) {
    this.paidListSubject.next(list); // Emite la nueva lista de pagos
  }

  getListPaids() {
    return this.paidListSubject.getValue(); // Obtiene el valor actual sin notificar
  }

  getPaidsObservable(): Observable<payDetailDTO[]> {
    return this.paidList$; // Devuelve el Observable para suscribirse a los cambios
  }
}
