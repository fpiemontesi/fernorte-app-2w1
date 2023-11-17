import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {StorageZone} from "../models/storage-zone";

@Injectable({
  providedIn: 'root'
})
export class StorageZoneService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<StorageZone[]> {
    return this.http.get<StorageZone[]>('http://localhost:3000/zones')
  }
}
