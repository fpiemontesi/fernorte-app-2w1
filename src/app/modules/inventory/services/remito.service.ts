import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { receipt } from '../models/remito';

export class ReceiptService {
  url: string = "http://localhost:3000/receipts";
  
  constructor(private http: HttpClient) { }

  getReceipts(): Observable<receipt[]> {
    const result = this.http.get<receipt[]>(
      this.url
    );
    return result;
  }
}
