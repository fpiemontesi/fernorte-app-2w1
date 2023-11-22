import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/Presupuesto';
import Swal from 'sweetalert2';
import { Cliente } from '../models/Cliente';
import { Existencia } from '../models/Existencia';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  presupuesto: Presupuesto= {} as Presupuesto;
  url: string = "http://localhost:8081/presupuesto";
  
  constructor(private http: HttpClient) {}

  getPresupuestoById(id: number): Observable<Presupuesto> {
    return this.http.get<Presupuesto>(`http://localhost:8080/ventas/getById/${id}`);
  }
  guardarPresupuesto(presupuesto: Presupuesto) {
    this.presupuesto = presupuesto;
  }
  MostrarPresupuesto(){
    return this.presupuesto
  }

  realizarSolicitudPutPresupuesto( presupuesto: Presupuesto): Observable<any> {
    const url = 'http://localhost:8080/presupuesto/{id}?id=' + presupuesto.id;
    const body = {
     doc_cliente: presupuesto.doc_cliente,
     tipo_venta: presupuesto.tipo_venta,
     fecha_creacion: presupuesto.fecha_creacion,
     detalles : presupuesto.detalles
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put(url, body, httpOptions);
  }

  realizarSolicitudPostPresupuesto(presupuesto: Presupuesto): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.url, presupuesto, httpOptions);
  }
  validarProducto(formData: any): boolean {
    if (formData.producto !== 0 && formData.cantidad !== 0 && formData.cantidad !== null) {
      return true;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Seleccione un producto y una cantidad',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    });
    return false;
  }

  getClienteByDni(dni: number): Observable<Cliente[]> {
    const url = `https://my-json-server.typicode.com/113974-Olivera-Gustavo/api-clients-bd/clientes?nro_doc=${dni}`;
    console.log("Servicio cliente consultado")
    return this.http.get<Cliente[]>(url);
  }

  getExistenciaByCodProducto(cod: string): Observable<Existencia[]> {
    const url = `https://my-json-server.typicode.com/113843-Decicco-Giovanni/ventas/existencias?codigo=${cod}`;
    return this.http.get<Existencia[]>(url);
  }

  getProductos(): Observable<Producto[]> {
    const url = `https://my-json-server.typicode.com/113935-Quilpatay-Nahuel-Ignacio/fakeapi/productos`;
    return this.http.get<Producto[]>(url);
  }

  deletePresupuesto(id : number): Observable<any> {
    const url = `${this.url}/`+id;
    return this.http.delete<any>(url);
  }
  
  getPresupuestosFilter(params:HttpParams){
    const urlWithParams = `${this.url}?${params.toString()}`;
    return this.http.get(urlWithParams);
  }

}