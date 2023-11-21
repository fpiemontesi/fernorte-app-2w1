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
<<<<<<< HEAD

  getAll(): Observable<Batch[]>{
    return this.http.get<Batch[]>('http://localhost:3000/batchs');
  }

  getById(id: number):Observable<Batch>{
    return this.http.get<Batch>('http://localhost:3000/batchs/'+id)
  }

  modificate(body: Batch, id: number): Observable<Batch>{
    return this.http.put<Batch>('http://localhost:3000/batchs/'+id, body)

  }
  
=======
  getAll(): Observable<Batch[]>{
    return this.http.get<Batch[]>(`http://localhost:3000/batches`);
  }
>>>>>>> a1a717f67d219c416745a5788c452c6ffaff36c0
}
