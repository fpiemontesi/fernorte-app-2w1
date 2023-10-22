import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/secciones`);
  }
}
