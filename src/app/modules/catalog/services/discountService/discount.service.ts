import { Injectable } from '@angular/core';
import { Discount } from '../../models/discount';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  discount:Discount= {} as Discount
  data:any;

  constructor(private http:HttpClient) { }
  get():Observable<Discount[]>{
    return this.http.get<Discount[]>("http://localhost:8080/api/discounts")
  }

  getByCode(code:string):Observable<Discount>{
    return this.http.get<Discount>("http://localhost:8080/api/discounts/" + code);
  }
  create(discount:Discount):Observable<Discount>{
    return this.http.post<Discount>("http://localhost:8080/api/discounts",discount)
  }
  update(discount:Discount):Observable<Discount>{
    console.log("Marca en service"+this.discount.nombre)
    return this.http.put<Discount>("http://localhost:8080/api/discounts/"+this.discount.codigo,discount)
  }
  delete(id:string):Observable<Discount>{
    return this.http.delete<Discount>("http://localhost:8080/api/discounts/" +id)
  }

  guardarMarca(discount:Discount){
    this.discount = discount
  }
  obtenerMarca():Discount{
    return this.discount
  }

}
