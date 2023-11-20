import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { existencia } from '../models/existencia';
import { articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {

  constructor(private http: HttpClient) { }

  get(): Observable<articulo[]>{
    const result = this.http.get<articulo[]>(
      'https://my-json-server.typicode.com/1w1111979DiFranciscoMateo/demo/articulos'
    );
    return result;
  }

  create(existencia : existencia) : Observable<existencia>{
    return this.http.post<existencia>(
      'https://my-json-server.typicode.com/1w1111979DiFranciscoMateo/demo/existencias',
      existencia
    );
  }
}
