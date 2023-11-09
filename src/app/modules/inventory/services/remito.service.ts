import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class RemitoService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Receipt>{
    return this.http.get<Receipt>('http://localhost:3000/receipts/'+id);
  }

  modify(receipt: Receipt): Observable<Receipt>{
      return this.http.put<Receipt>('http://localhost:3000/receipts/'+receipt.id,receipt);
  }
}
