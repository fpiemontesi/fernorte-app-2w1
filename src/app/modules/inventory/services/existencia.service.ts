import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Existence } from '../models/existence';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {

  constructor(private http: HttpClient) { }

  get(): Observable<Article[]>{
    const result = this.http.get<Article[]>(
      'http://localhost:3000/articles'
    );
    return result;
  }

  create(existencia : Existence) : Observable<Existence>{
    return this.http.post<Existence>(
      'http://localhost:3000/existences',
      existencia
    );
  }
}
