import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private client:HttpClient) { }

  getAllProducts():Observable<Producto[]>{
      return this.client.get<Producto[]>("http://localhost:8080/productos");
  }

  getProductByCode(code:string):Observable<Producto>{
    return this.client.get<Producto>("http://localhost:8080/productos/"+code);
  }

  getProductsActive():Observable<Producto[]>{
    return this.client.get<Producto[]>("http://localhost:8080/productos/activos");
  }
  updateProduct(code:string, product:Producto):Observable<Producto>{
    return this.client.put<Producto>("http://localhost:8080/productoModificar/"+code, product);
  }

  deleteProduct(code:string):Observable<Producto>{
    return this.client.delete<Producto>("http://localhost:8080/productoEliminar/"+code);
  }
}
