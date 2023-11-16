import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExistenciaStock } from '../models/existencia-stock';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaStockService {

  constructor(private http: HttpClient) { }

  get(): Observable<ExistenciaStock[]>{
    const result = this.http.get<ExistenciaStock[]>(
      'https://my-json-server.typicode.com/1w1111979DiFranciscoMateo/demo/existenciasStockBajo'
    );
    return result;
    //return this.http.get<ExistenciaStock[]>(`https://my-json-server.typicode.com/1w1111979DiFranciscoMateo/demo/existenciasStockBajo`);
  }
}
