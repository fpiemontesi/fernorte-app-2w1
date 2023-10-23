import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private client:HttpClient) { }

  getAllModels():Observable<Producto[]>{
      return this.client.get<Producto[]>("http://localhost:8080/productos");
  }

  getModelById(id:string):Observable<Producto>{
    return this.client.get<Producto>("http://localhost:8080/productos/"+id);
  }
}
