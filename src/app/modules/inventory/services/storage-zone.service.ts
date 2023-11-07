import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Zone} from "../models/storage-zone";

@Injectable({
  providedIn: 'root'
})
export class StorageZoneService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Zone[]>{
    return this.http.get<Zone[]>(`http://localhost:3000/zones`);
  }
}
