import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Clients/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  obtenerCliente(): Observable<Client[]>{
    return this.http.get<Client[]>('https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-clients-bd/clientes');
  }

}
