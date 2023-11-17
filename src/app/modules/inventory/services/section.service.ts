import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  create(body: Section): Observable<Section>{
    return this.http.post<Section>('http://localhost:3000/sections', body);
  }

  edit(body: Section): Observable<Section>{
    return this.http.put<Section>(`http://localhost:3000/sections/${body.id}`, body);
  }

  getById(id: number): Observable<Section>{
    return this.http.get<Section>(`http://localhost:3000/sections/${id}`);
  }

  getByZone(nombreZona: number): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/sections/?zoneId=${nombreZona.toString()}`);
  }

  getAll(): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/sections`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/sections/${id}`);
  }
}
