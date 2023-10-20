import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Existencias } from '../models/existencias';

@Injectable({
  providedIn: 'root'
})
export class ListarExistenciasService {

  private url='http://localhost:3000/existencias';

  constructor(private htpp: HttpClient) { }


  public getExistencias() : Observable<Existencias[]> {
    return this.htpp.get<Existencias[]>(this.url);
  }

  public deleteExistencia(id:number) :Observable<Existencias>{
    return this.htpp.delete<Existencias>(this.url+'/'+id);
  }


}
