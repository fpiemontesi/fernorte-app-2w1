import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-clients-bd/clientes';

  constructor(private http:HttpClient) { }

  getClientes(): Observable<any[]> {
   return this.http.get<any[]>(this.baseUrl);
  }
}