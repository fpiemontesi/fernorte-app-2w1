import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lotes } from '../models/lotes';
import { ExistenciaStock } from '../models/existenciaStock';

@Injectable({
  providedIn: 'root'
})
export class ListExistenciasService {

  constructor(private http:HttpClient) { }

 

 private url:string='http://localhost:3000/lotes';

  public getExistenciasStockTotal():Observable<ExistenciaStock[]>{
    return this.http.get<ExistenciaStock[]>(this.url);
  }

}
