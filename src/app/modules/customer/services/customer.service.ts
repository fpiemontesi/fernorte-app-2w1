import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor() {}

  private clientesSubject = new BehaviorSubject<any[]>([]);
  clientes$: Observable<any[]> = this.clientesSubject.asObservable();

  private clientesSubject2 = new BehaviorSubject<any[]>([]);
  clientes2$: Observable<any[]> = this.clientesSubject2.asObservable();

  getClientes(): any[] {
    return this.clientesSubject.value;
    return this.clientesSubject2.value;
  }

  agregarCliente(cliente: any) {
    const clientes = this.clientesSubject.value;
    clientes.push(cliente);
    this.clientesSubject.next(clientes);
  }

  actualizarCliente(cliente: any) {
    const clientes = this.clientesSubject2.value;
    clientes.push(cliente);
    this.clientesSubject2.next(clientes);
  }
}
