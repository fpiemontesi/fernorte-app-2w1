import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { HttpClient } from '@angular/common/http';
import { Stadistic } from '../models/stadistic';

@Injectable({
  providedIn: 'root'
})
export class StadisticsService {

constructor(private http: HttpClient) { }

getExpired(): Observable<Stadistic>{
  return this.http.get<Stadistic>(`http://localhost:3000/stadistic_expired`);
}


getDamaged(): Observable<Stadistic>{
  return this.http.get<Stadistic>(`http://localhost:3000/stadistic_damaged`);
}
}
