import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  create(body: Batch): Observable<Batch>{
    return this.http.post<Batch>('http://localhost:3000/batchs', body);
  }
  getAll(): Observable<Batch[]>{
    return this.http.get<Batch[]>(`http://localhost:3000/batchs`);
  }
}
