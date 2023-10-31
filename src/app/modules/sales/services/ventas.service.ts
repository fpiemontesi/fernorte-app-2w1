import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../models/Ventas';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  idVenta!: number;
  constructor(private http : HttpClient) { 
 }

  private apiUrl = 'http://localhost:3000/ventas';
  private urlId = 'http://localhost:8080/ventas/'
  
  // getVentas(): Observable<Ventas[]>{
  //  const result= this.http.get<Ventas[]>('http://localhost:8080/ventas/get');
  //  return result;
  // }

  getClientes(): Observable<any> {
    const url = 'https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-clients-bd/clientes';
    return this.http.get(url);
  }
    

  guardarId(id: number) {
    this.idVenta = id;
  }

  obtenerId(): number {
    return this.idVenta;
  }

  getVentaById(ventaId: number) {
    return this.http.get(`${this.apiUrl}${ventaId}`);
  }

  realizarSolicitudPostVenta(formData: any, productosVenta: any): Observable<any> {
    
    const url = 'http://localhost:8080/ventas/save';
    const body = {
      fecha: new Date().toISOString(),
      id_cliente: formData.cliente,
      tipo_venta: formData.tipo,
      forma_entrega: formData.formaEntrega,
      fecha_entrega: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      id_vendedor: formData.vendedor,
      detalles: productosVenta
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }
}
