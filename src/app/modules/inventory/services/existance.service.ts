import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Existencia } from '../models/existencia';

@Injectable({
  providedIn: 'root'
})
export class ListarExistenciasService {

  private url='http://localhost:3000/existencias';

  constructor(private http: HttpClient) { }


  public getExistencias() : Observable<Existencia[]> {
    return this.http.get<Existencia[]>(this.url);
  }

  public deleteExistencia(id:number) :Observable<Existencia>{
    return this.http.delete<Existencia>(this.url+'/'+id);
  }
  public modificarExistencia(existencia:Existencia):Observable<Existencia>{
    return this.http.put<Existencia>('https://my-json-server.typicode.com/'+
    '1w1111979DiFranciscoMateo/demo/existencias/'+existencia.id,{
      stock_minimo: existencia.stock_minimo
    });


}
