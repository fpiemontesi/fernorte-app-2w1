import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  getAllBySection(sectionId: number): Observable<Batch[]>{
    return this.http.get<Batch[]>(`http://localhost:3000/batches?sectionId=${sectionId}`);
  }

  getById(id: number): Observable<Batch>{
    return this.http.get<Batch>("http://localhost:3000/batches/" + id);
  }

  getAll(): Observable<Batch[]>{
    return this.http.get<Batch[]>('http://localhost:3000/batches');
  }

  getExpired(): Observable<Batch[]>{
    return this.http.get<Batch[]>('http://localhost:3000/batches');
  }
  
  create(body: Batch): Observable<Batch>{
    return this.http.post<Batch>('http://localhost:3000/batches', body);
  }

  modificate(body: Batch, id: number): Observable<Batch>{
    return this.http.put<Batch>('http://localhost:3000/batches/'+id, body)

  }

  getSoonToExpire() : Observable<Batch[]>{
    return this.http.get<Batch[]>('https://my-json-server.typicode.com/1w1111979DiFranciscoMateo/demo/lotesProntoAExpirar');
  }
  
  delete(id:number): Observable<Batch>{
    return this.http.delete<Batch>('http://localhost:3000/batches/'+id);
  }

}
