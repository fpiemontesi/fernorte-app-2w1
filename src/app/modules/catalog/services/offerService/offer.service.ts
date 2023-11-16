import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferDtoProducto } from '../../components/dtos/offer-dto-producto';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offer';
import { OfferDto } from '../../components/dtos/offer-dto';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http:HttpClient) { }
  data:OfferDto = {} as OfferDto

  get(): Observable<OfferDtoProducto[]>{
    return this.http.get<OfferDtoProducto[]>('http://localhost:8080/api/offers')
  }
  getByCode(code:string):Observable<OfferDtoProducto>{
    return this.http.get<OfferDtoProducto>('http://localhost:8080/api/offers/'+ code)
  }
  create(offer:OfferDto):Observable<OfferDto>{
    return this.http.post<Offer>('http://localhost:8080/api/offers', offer)
  }
  update(offer:Offer):Observable<Offer>{
    this.data={
      nombre: offer.nombre,
      activo:offer.activo,
      precio_oferta: offer.precio_oferta,
      descripcion: offer.descripcion,
      codigo_producto: offer.codigo_producto
    }
    return this.http.put<Offer>('http://localhost:8080/api/offers/'+offer.codigo,this.data)
  }
  delete(code:string):Observable<Offer>{
    return this.http.delete<Offer>('http://localhost:8080/api/offers/' + code)
  }
}
