import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Section} from "../models/section";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  getAllByZone(zoneId: number): Observable<Section[]>{
    return this.http.get<Section[]>(`http://localhost:3000/sections?zoneId=${zoneId}`);
  }
}
