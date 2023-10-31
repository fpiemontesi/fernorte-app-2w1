import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receipt } from '../models/remito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemitoService {

  constructor(private http: HttpClient) {}

  create(body: Receipt): Observable<Receipt>{
    return this.http.post<Receipt>('http://localhost:3000/receipts', body);
  }
}
