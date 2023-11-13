import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private urlPostCliente = 'http://localhost:8080/clientes/postCliente';
  private urlPutCliente = 'http://localhost:8080/clientes/updateCliente';
  private urlGetClientes = 'http://localhost:8080/clientes/getAllClientes';

  private urlPostUsuario = 'http://localhost:8081/auth/register';
  private urlDeleteUsuario = 'http://localhost:8081/auth/baja-logica';
  private urlGetUsuariosCargo = 'http://localhost:8081/auth/getUser/ByCargo';

  private urlLoginUsuario = 'http://localhost:8081/auth/login';
  private urlResetPasswordUsuario =
    'http://localhost:8081/auth/forgot-password';
  private urlVerifyUsuario = 'http://localhost:8081/auth/reset-password';
  private urlUpdatePasswordsuario =
    'http://localhost:8081/auth/update-password';

  private urlGetCargos = 'http://localhost:8081/auth/getCargos';
  private urlPostCargo = 'http://localhost:8081/auth/createCargo';

  private urlGenerarTurnoClienteRegistrado =
    'http://localhost:8080/turnero/generarTurnoClienteRegistrado';
  private urlGenerarTurnoClienteTemporal =
    'http://localhost:8080/turnero/generarTurnoClienteTemporal';
  private urlGetTurnos = 'http://localhost:8080/turnero/getClientesSinAtender';
  private urlGetAtendidos = 'http://localhost:8080/turnero/getClientesAtendidos';
  private urlPutEstadoTurnos = 'http://localhost:8080/turnero/atenderCliente';

  constructor(private httpClient: HttpClient) {}

  public postCliente(cliente: any): Observable<any> {
    return this.httpClient.post(this.urlPostCliente, cliente);
  }

  public actualizarCliente(cliente: any): Observable<any> {
    return this.httpClient.put(this.urlPutCliente, cliente);
  }

  public getClientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetClientes);
  }

  public postUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.urlPostUsuario, usuario);
  }

  public deleteUsuario(numeroDoc: any): Observable<any> {
    const url = `${this.urlDeleteUsuario}/${numeroDoc}`;
    return this.httpClient.put(url, numeroDoc);
  }

  public getUsuariosPorCargo(cargo: string): Observable<any[]> {
    const url = `${this.urlGetUsuariosCargo}?cargo=${cargo}`;
    return this.httpClient.get<any[]>(url);
  }

  public loginUsuario(credentials: any): Observable<any> {
    return this.httpClient.post(this.urlLoginUsuario, credentials);
  }

  public resetPasswordUsuario(email: any): Observable<any> {
    return this.httpClient.post(this.urlResetPasswordUsuario, email, {
      responseType: 'text',
    });
  }

  public verifyUsuario(verification: any): Observable<any> {
    return this.httpClient.post(this.urlVerifyUsuario, verification);
  }

  public updatePasswordUsuario(password: any): Observable<any> {
    return this.httpClient.post(this.urlUpdatePasswordsuario, password, {
      responseType: 'text',
    });
  }

  public postCargo(cargo: any): Observable<any> {
    return this.httpClient.post(this.urlPostCargo, cargo);
  }

  public getCargos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetCargos);
  }

  public generarTurnoClienteRegistrado(nroDoc: number): Observable<any> {
    const url = `${this.urlGenerarTurnoClienteRegistrado}?nroDoc=${nroDoc}`;
    return this.httpClient.post(url, {});
  }

  public generarTurnoClienteTemporal(clienteTemporal: any): Observable<any> {
    return this.httpClient.post(
      this.urlGenerarTurnoClienteTemporal,
      clienteTemporal
    );
  }

  public getTurnos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetTurnos);
  }

  public getAtendidos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlGetAtendidos);
  }

  public putEstadoTurno(id: number): Observable<any> {
    const url = `${this.urlPutEstadoTurnos}/${id}`;
    return this.httpClient.put(url, {});
  }
}
