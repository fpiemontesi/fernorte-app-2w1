import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {StockControlReport} from "../models/StockControlReport";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockControlReportService {

  constructor(private http: HttpClient) { }

  create(body: StockControlReport): Observable<StockControlReport> {
    return this.http.post<StockControlReport>("http://localhost:3000/stockControlReports", body);
  }

  getById(id: number): Observable<StockControlReport>{
    return this.http.get<StockControlReport>('http://localhost:3000/stockControlReports/'+id);
  }

  modify(control: StockControlReport): Observable<StockControlReport>{
      return this.http.put<StockControlReport>('http://localhost:3000/stockControlReports/'+control.id,control);
  }

  public get():Observable<StockControlReport[]>{
    return this.http.get<StockControlReport[]>("http://localhost:3000/stockControlReports");
  }
}
