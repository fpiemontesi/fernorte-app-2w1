import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reservation } from '../models/reservation';
import { Existence } from '../models/existence';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  getReservations(): Observable<reservation[]>{
    return this.http.get<reservation[]>("http://localhost:3000/reservations");
  }

  //---ACORDATE JSON-SERVER BUSCAR QUERYPARAM (STRING EL ID) TRAE UN ARRAY---
  getStockById(code:String): Observable<Existence[]>{
    return this.http.get<Existence[]>("http://localhost:3000/existences?code="+code);
  }

}
