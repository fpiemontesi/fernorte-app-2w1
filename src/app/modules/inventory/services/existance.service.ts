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
  public getExistencia(id:number) : Observable<Existencia> {
    return this.http.get<Existencia>(this.url+'/'+id);
  }
  public deleteExistencia(id:number) :Observable<Existencia>{
    return this.http.delete<Existencia>(this.url+'/'+id);
  }
  public modificarExistencia(existencia:Existencia):Observable<Existencia>{
    return this.http.put<Existencia>(this.url+'/'+existencia.id,existencia);
  }


}
