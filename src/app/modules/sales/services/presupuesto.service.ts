import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/Presupuesto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private baseUrl = 'http://localhost:8080/ventas/get';

  constructor(private http: HttpClient) {}

  getPresupuestoById(id: number): Observable<Presupuesto> {
    return this.http.get<Presupuesto>(`${this.baseUrl}/ById/${id}`);
  }

  realizarSolicitudPostPresupuesto(
    cliente: string,
    productos: any[]
  ): Observable<any> {
    const url = 'http://localhost:8080/presupuesto/Save';
    const body = {
      nro_presupuesto: '',
      cliente: cliente,
      fecha_creacion: new Date().toISOString(),
      fecha_vencimiento: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      productos: productos,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, body, httpOptions);
  }
  validarProducto(formData: any): boolean {
    if (
      formData.producto !== 0 &&
      formData.cantidad !== 0 &&
      formData.cantidad !== null
    ) {
      return true;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Seleccione un producto y una cantidad',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    });
    return false;
  }

  private apiUrl = 'http://localhost:8080/presupuesto/ByDatesAndClient';

  getPresupuestoByDatesAndClient(parametros: any): Observable<any> {
    return this.http.post(this.apiUrl, parametros);
  }
}
