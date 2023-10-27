import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '../models/lote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient) { }

  create(body: Lote): Observable<Lote>{
    return this.http.post<Lote>('http://localhost:3000/lotes', body);
  }
  getAll(): Observable<Lote[]>{
    return this.http.get<Lote[]>(`http://localhost:3000/lotes`);
  }
}
