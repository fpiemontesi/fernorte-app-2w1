import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private baseUrl = 'http://localhost:8080/ventas/get';
  presupuesto: Presupuesto= {} as Presupuesto;
  constructor(private http: HttpClient) {}

  getPresupuestoById(id: number): Observable<Presupuesto> {
    return this.http.get<Presupuesto>(`${this.baseUrl}/ById/${id}`);
  }
  guardarPresupuesto(presupuesto: Presupuesto) {
    this.presupuesto = presupuesto;
  }
  MostrarPresupuesto(){
    return this.presupuesto
  }

  realizarSolicitudPostPresupuesto(cliente: string, productos: any[]): Observable<any> {
    
    const url = 'http://localhost:8080/presupuesto/Save';
    const body = {
      nro_presupuesto: '',
      cliente: cliente,
      fecha_creacion: new Date().toISOString(),
      fecha_vencimiento: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      productos: productos,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, body, httpOptions);
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
}