import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../models/Ventas';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  venta: Ventas= {} as Ventas;
  idVenta!: number;
  constructor(private http : HttpClient) {
 }

 // private apiUrl = 'http://localhost:3000/ventas';
  private urlId = 'http://localhost:8080/ventas'

  // getVentas(): Observable<Ventas[]>{
  //  const result= this.http.get<Ventas[]>('http://localhost:8080/ventas/get');
  //  return result;
  // }

  getClientes(): Observable<any> {
    const url = 'https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-clients-bd/clientes';
    return this.http.get(url);
  }

  getArticulos(): Observable<any> {
    const url = 'http://localhost:3000/articulos';
    return this.http.get(url);
  }
  guardarId(ventas: Ventas) {
    this.venta = ventas;
  }
  obtenerVentas():Ventas  {
    return this.venta;
  }

  obtenerId(): number {
    return this.idVenta;
  }

  getVentaById(ventaId: number) {
    return this.http.get(`${this.urlId}/${ventaId}`);
  }

  actualizarEstado(ventaId: number, nuevoEstado: number) {
    const url = `${this.urlId}/estado/${ventaId}`;
    const body = { estado: nuevoEstado };

    return this.http.put(url, body);
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


  realizarModificacionVenta(ventaId: number, formData: any, productosVenta: any): Observable<any> {
    const url = 'http://localhost:8080/ventas/';
    const body = {
      doc_cliente: formData.doc_cliente,
      fecha: new Date().toISOString(),
      tipo_venta: formData.tipo_venta,
      forma_entrega: formData.forma_entrega,
      fecha_entrega: new Date().toISOString(),
      id_vendedor: formData.id_vendedor,
      detalles: productosVenta
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.put(url + ventaId, body, httpOptions);
  }

  apiUrl = 'http://localhost:8080';
  modificarVenta(ventaId: number, ventaData: any): Observable<any> {
    const url = `${this.apiUrl}/ventas/${ventaId}`;
    return this.http.put(url, ventaData);
  }

  
}
