import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lotes } from '../models/lotes';

@Injectable({
  providedIn: 'root'
})
export class ListExistenciasService {

  constructor(private http:HttpClient) { }

  private url!:string;

  public getExistenciasStockTotal(){
    return this.http.get<Lotes>(this.url);
  }


}
