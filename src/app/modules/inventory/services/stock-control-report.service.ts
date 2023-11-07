import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
