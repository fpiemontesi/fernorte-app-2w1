import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from '../models/Ventas';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http : HttpClient) { }

 // private url = 'http://localhost:3000/ventas';

  
  getVentas(): Observable<Ventas[]>{
   const result= this.http.get<Ventas[]>('http://localhost:8080/ventas/get');
   return result;

  }
}
