import { Injectable } from '@angular/core';
import { Ventas } from '../models/Ventas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = 'http://localhost:3000/datos';
  constructor(private http: HttpClient) { }

  getReportes(mes: number, anio: number, tipo_venta: number): Observable<Ventas[]> {
    const url = `${this.apiUrl}?mes=${mes}&anio=${anio}&tipo_venta=${tipo_venta}`;
    return this.http.get<Ventas[]>(url);
  }
}
