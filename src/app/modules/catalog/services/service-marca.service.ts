import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ServiceMarcaService {
  marca:Marca= {} as Marca
  data:any;
  
  constructor(private http:HttpClient) { }
  get():Observable<Marca[]>{
    return this.http.get<Marca[]>("http://localhost:3000/marcas")
  }
  create(marca:Marca):Observable<Marca>{
    return this.http.post<Marca>("http://localhost:3000/marcas",marca)
  }
  update(marca:Marca):Observable<Marca>{
    console.log("Marca en service"+this.marca.nombre)
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
