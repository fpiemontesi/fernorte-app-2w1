import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/Presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private baseUrl = 'http://localhost:8080/ventas/get';

  constructor(private http: HttpClient) {}

  getPresupuestoById(id: number): Observable<Presupuesto> {
    return this.http.get<Presupuesto>(`${this.baseUrl}/ById/${id}`);
  }
}