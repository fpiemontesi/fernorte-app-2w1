import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class productService {

  constructor(private client:HttpClient) { }

  getAllProducts():Observable<Producto[]>{
      return this.client.get<Producto[]>("http://localhost:8080/api/products");
  }

  getProductByCode(code:string):Observable<Producto>{
    return this.client.get<Producto>("http://localhost:8080/api/products/"+code);
  }

  getProductsActive():Observable<Producto[]>{
    return this.client.get<Producto[]>("http://localhost:8080/api/products/actives-inactive?activo=true");
  }
  updateProduct(code:string, product:Producto):Observable<Producto>{
    return this.client.put<Producto>("http://localhost:8080/api/products/"+code, product);
  }

  deleteProduct(code:string):Observable<Producto>{
    return this.client.delete<Producto>("http://localhost:8080/api/products/"+code);
  }
}
