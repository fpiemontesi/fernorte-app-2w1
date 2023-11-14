import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dolar } from '../models/Dolar';

@Injectable({
  providedIn: 'root'
})
export class DolarServiceService {
  constructor(private http: HttpClient) { }

  obtenerDolar(): Observable<Dolar>{
    return this.http.get<Dolar>('https://dolarapi.com/v1/dolares/blue');
  }
}
