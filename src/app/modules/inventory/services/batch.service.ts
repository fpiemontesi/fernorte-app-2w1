import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Batch} from "../models/batch";

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  getAllBySection(sectionId: number): Observable<Batch[]>{
    return this.http.get<Batch[]>(`http://localhost:3000/batchs?sectionId=${sectionId}`);
  }

  getById(id: number): Observable<Batch>{
    return this.http.get<Batch>("http://localhost:3000/batchs/" + id);
  }
}
