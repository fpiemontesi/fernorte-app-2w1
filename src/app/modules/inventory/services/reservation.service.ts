import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reservation } from '../models/reservation';
import { stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlReservation:string="http://localhost:3000/reservations";
  urlStock:string="http://localhost:3000/stock/";

  constructor(private http : HttpClient) { }

  getReservations(): Observable<reservation[]>{
    return this.http.get<reservation[]>(this.urlReservation);
  }

  getStockById(id:number): Observable<stock>{
    return this.http.get<stock>(this.urlStock+id);
  }

}
