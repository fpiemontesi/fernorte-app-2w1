import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrlCliente = 'http://localhost:8080/clientes';
  private baseUrlUsuario = 'http://localhost:8081/auth';
  private baseUrlTurnero = 'http://localhost:8080/turnero';
  private urlGetBenefits =
    'https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-catalogo-bd/productos';
  private urlPostBenefits =
    'http://localhost:8080/fidelizacion/sendProductCatalogToAllClientsFilter';

  constructor(private httpClient: HttpClient) {}

  public postCliente(cliente: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrlCliente}/postCliente`, cliente);
  }

  public actualizarCliente(cliente: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrlCliente}/updateCliente`, cliente);
  }

  public getClientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrlCliente}/getAllClientes`);
  }

  public postUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrlUsuario}/register`, usuario);
  }

  public deleteUsuario(numeroDoc: any): Observable<any> {
    const url = `${this.baseUrlUsuario}/baja-logica/${numeroDoc}`;
    return this.httpClient.put(url, numeroDoc);
  }

  public getUsuariosPorCargo(cargo: string): Observable<any[]> {
    const url = `${this.baseUrlUsuario}/getUser/ByCargo?cargo=${cargo}`;
    return this.httpClient.get<any[]>(url);
  }

  public loginUsuario(credentials: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrlUsuario}/login`, credentials);
  }

  public resetPasswordUsuario(email: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrlUsuario}/forgot-password`,
      email,
      {
        responseType: 'text',
      }
    );
  }

  public verifyUsuario(verification: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrlUsuario}/reset-password`,
      verification
    );
  }

  public updatePasswordUsuario(password: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrlUsuario}/update-password`,
      password,
      {
        responseType: 'text',
      }
    );
  }

  public postCargo(cargo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrlUsuario}/createCargo`, cargo);
  }

  public getCargos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrlUsuario}/getCargos`);
  }

  public generarTurnoClienteRegistrado(nroDoc: number): Observable<any> {
    const url = `${this.baseUrlTurnero}/generarTurnoClienteRegistrado?nroDoc=${nroDoc}`;
    return this.httpClient.post(url, {});
  }

  public generarTurnoClienteTemporal(clienteTemporal: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrlTurnero}/generarTurnoClienteTemporal`,
      clienteTemporal
    );
  }

  public getTurnos(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrlTurnero}/getClientesSinAtender`
    );
  }

  public getAtendidos(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrlTurnero}/getClientesAtendidos`
    );
  }

  public putEstadoTurno(id: number): Observable<any> {
    const url = `${this.baseUrlTurnero}/atenderCliente/${id}`;
    return this.httpClient.put(url, {});
  }

  public getPromociones(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetBenefits);
  }

  public postBenefits(): Observable<any> {
    const requestBody = {};
    return this.httpClient.post(this.urlPostBenefits, requestBody, {
      responseType: 'text',
    });
  }
}
