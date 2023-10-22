import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote';

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
