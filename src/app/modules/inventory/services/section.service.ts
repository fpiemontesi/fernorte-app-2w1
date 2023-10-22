import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Section} from "../models/section";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  create(body: Section): Observable<Section>{
    return this.http.post<Section>('http://localhost:3000/secciones', body);
  }

  getById(id: string): Observable<Section>{
    return this.http.get<Section>(`http://localhost:3000/secciones/${id}`);
  }

  getByZone(nombreZona: number): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/secciones/?id_zona=${nombreZona.toString()}`);
  }

  getAll(): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/secciones`);
  }
}
