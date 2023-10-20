import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Remito } from '../models/remito';

@Injectable({
  providedIn: 'root'
})
export class RemitoServService {
  url:string="";
  constructor(private http:HttpClient) { }

  getRemitos(): Observable<Remito[]>{
    const result = this.http.get<Remito[]>(
      this.url
    )
      return result;
  }

}
