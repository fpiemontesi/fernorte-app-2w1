import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

 
  private apiUrl = 'http://localhost:8080/reportes'; 

  constructor(private http: HttpClient) {  }

  getReportes(anio: number, mes?: number, tipo_venta?: number): Observable<any> {
    let params = new HttpParams().set('anio', anio);
    console.log('anio', anio , 'mes', mes, 'tipoVenta', tipo_venta);
    
    if (mes !== undefined && mes != 0) {
      params = params.set('mes', mes);
    }

    if (tipo_venta !== undefined && tipo_venta != 0) { 
      params = params.set('tipoVenta', tipo_venta);
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      tap((reportes) => {
        console.log('Reportes obtenidos:', reportes); 
      })
    );
  }


}
