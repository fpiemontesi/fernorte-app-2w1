import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private urlId = 'http://localhost:8080/ventas/'


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
    const url = `${this.urlId}${ventaId}?estado=${nuevoEstado}`;

    return this.http.put(url, null);
  }

  realizarSolicitudPostVenta(venta: Ventas): Observable<any> {

    const url = 'http://localhost:8080/ventas/';
    const body = venta;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, httpOptions);
  }


  realizarModificacionVenta(ventaId: number, formData: any, productosVenta: any): Observable<any> {
    const url = 'http://localhost:8080/venta/';
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

  filtrarVentas(
    venta: any,
    montoDesde: number | null,
    montoHasta: number | null,
    fechaDesde: string | null,
    fechaHasta: string | null
  ): Observable<Ventas[]> {
    let params = new HttpParams();

    if (venta.id) {
      params = params.set('id', venta.id);
    }

    if (venta.doc_cliente) {
      params = params.set('id_cliente', venta.doc_cliente);
    }

    if (venta.id_vendedor) {
      params = params.set('id_vendedor', venta.id_vendedor);
    }

    if (venta.tipo_venta) {
      params = params.set('tipo_venta', venta.tipo_venta);
    }

    if (venta.forma_entrega) {
      params = params.set('forma_entrega', venta.forma_entrega);
    }

    if (montoDesde) {
      params = params.set('monto_desde', montoDesde.toString());
    }

    if (montoHasta) {
      params = params.set('monto_hasta', montoHasta.toString());
    }

    if (fechaDesde) {
      params = params.set('fecha_min', fechaDesde);
    }

    if (fechaHasta) {
      params = params.set('fecha_max', fechaHasta);
    }
    if(venta.estado){
      params = params.set('estado', venta.estado);
    }

    const url = 'http://localhost:8080/ventas/';

    const urlWithParams = `${url}?${params.toString()}`;

    return this.http.get<Ventas[]>(urlWithParams);
  }
  bajaVenta(ventaId:number) {
    return this.http.delete('http://localhost:8080/ventas/' + ventaId);
  }

  
}
