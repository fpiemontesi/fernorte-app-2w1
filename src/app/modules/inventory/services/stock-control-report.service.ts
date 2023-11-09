import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockControlReport } from '../models/StockControlReport';

@Injectable({
  providedIn: 'root'
})
export class StockControlReportService {

  constructor(private http: HttpClient) {  }

  getById(id: number): Observable<StockControlReport>{
    return this.http.get<StockControlReport>('http://localhost:3000/stockControlReports/'+id);
  }

  modify(control: StockControlReport): Observable<StockControlReport>{
      return this.http.put<StockControlReport>('http://localhost:3000/stockControlReports/'+control.id,control);
  }
}
