import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reservation } from '../models/reservation';
import { existence } from '../models/existence';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlReservation:string="http://localhost:3000/reservations";
  urlStock:string="http://localhost:3000/existences/";

  constructor(private http : HttpClient) { }

  getReservations(): Observable<reservation[]>{
    return this.http.get<reservation[]>(this.urlReservation);
  }

  getStockById(id:number): Observable<existence>{
    return this.http.get<existence>(this.urlStock+id);
  }

}
