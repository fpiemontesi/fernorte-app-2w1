import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marca:Marca= {} as Marca
  
  constructor(private http:HttpClient) { }
  get():Observable<Marca[]>{
    return this.http.get<Marca[]>("http://localhost:3000/marcas")
  }
  create(marca:Marca):Observable<Marca>{
    return this.http.post<Marca>("http://localhost:3000/marcas",marca)
  }
  update(marca:Marca):Observable<Marca>{
    return this.http.put<Marca>("http://localhost:3000/marcas/"+marca.id,marca)
  }
  delete(id:string):Observable<Marca>{
    return this.http.delete<Marca>("http://localhost:3000/marcas/" +id)
  }

  guardarMarca(marca:Marca){
    this.marca = marca
  }
  obtenerMarca():Marca{
    return this.marca
  }
}
