import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Existence } from '../models/existence';

@Injectable()
export class ExistenciasService {

  private url='http://localhost:3000/existences';

  constructor(private http: HttpClient) { }


  public getExistencias() : Observable<Existence[]> {
    return this.http.get<Existence[]>(this.url);
  }
  public getExistencia(id:string) : Observable<Existence> {
    return this.http.get<Existence>(this.url+'/'+id);
  }
  public deleteExistencia(id:string) :Observable<Existence>{
    return this.http.delete<Existence>(this.url+'/'+id);
  }
  public modificarExistencia(existencia:Existence):Observable<Existence>{
    return this.http.put<Existence>(this.url+'/'+existencia.code,existencia);
  }


}
