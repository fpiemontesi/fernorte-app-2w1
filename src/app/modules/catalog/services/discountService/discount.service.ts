import { Injectable } from '@angular/core';
import { Discount } from '../../models/discount';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DiscountDto } from '../../components/dtos/discount-dto';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  discount:Discount= {} as Discount
  data:DiscountDto = {} as DiscountDto

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
    console.log(this.data.codigo_producto)
    this.data = {
      nombre: discount.nombre,
      descripcion:discount.descripcion,
      precio_min: discount.precio_min,
      precio_top: discount.precio_top,
      codigo_producto: discount.codigo_producto,
      activo:discount.activo
    }
    return this.http.put<Discount>("http://localhost:8080/api/discounts/"+discount.codigo,this.data)
  }
  delete(id:string):Observable<Discount>{
    return this.http.delete<Discount>("http://localhost:8080/api/discounts/" +id)
  }

  guardarDiscount(discount:Discount){
    this.discount = discount
  }
  obtenerDiscount():Discount{
    return this.discount
  }

}
