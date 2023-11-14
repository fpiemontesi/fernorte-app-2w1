import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private urlGetClientes = 'http://localhost:8080/clientes/getAllClientes';
  private urlPostCliente = 'http://localhost:8080/clientes/postCliente';
  private urlPutCliente = 'http://localhost:8080/clientes/updateCliente';

  constructor(private httpClient: HttpClient) {}

  public getClientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetClientes);
  }

  public postCliente(cliente: any): Observable<any> {
    return this.httpClient.post(this.urlPostCliente, cliente);
  }

  public actualizarCliente(cliente: any): Observable<any> {
    return this.httpClient.put(this.urlPutCliente, cliente);
  }
}