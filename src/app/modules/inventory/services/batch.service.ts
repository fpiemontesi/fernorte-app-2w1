import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { batch } from '../models/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<batch[]>{
    return this.http.get<batch[]>('http://localhost:3000/batches');
  }
}
