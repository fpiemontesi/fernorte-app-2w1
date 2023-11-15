import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Existence } from '../models/existence';

@Injectable({
  providedIn: 'root'
})
export class ExistenceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Existence[]>{
    return this.http.get<Existence[]>(`http://localhost:3000/existences`);
  }
}
