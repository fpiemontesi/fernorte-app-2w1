import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlStock } from '../models/controlStock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListControlStockService {

  constructor(private http:HttpClient) { }

 // http://localhost:8080/inventario/controles-stock/getUltimoMes

 private url:string='http://localhost:3000/control';

  public get():Observable<ControlStock[]>{
    return this.http.get<ControlStock[]>(this.url);
  }

}
