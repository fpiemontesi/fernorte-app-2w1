import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientReportDTO } from '../models/client-report-dto';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  obtenerMontoTotalPorCliente(): Observable<ClientReportDTO[]>{
    return this.http.get<ClientReportDTO[]>('http://localhost:8081/ReportsByClients?dateFrom=2%2F10%2F2023&dateTo=2%2F11%2F2023');
  }
}
