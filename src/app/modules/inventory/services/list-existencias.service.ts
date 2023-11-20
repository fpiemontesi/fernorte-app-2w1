import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lotes } from '../models/lotes';
import { ExistenceStock } from '../models/ExistenceStock';

@Injectable({
  providedIn: 'root'
})
export class ListExistenciasService {

  constructor(private http:HttpClient) { }



 private url:string='http://localhost:3000/existencesStock';

  public getExistenciasStockTotal():Observable<ExistenceStock[]>{
    return this.http.get<ExistenceStock[]>(this.url);
  }

}
