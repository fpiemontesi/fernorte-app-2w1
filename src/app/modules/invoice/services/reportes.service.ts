import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientReportDTO } from '../models/client-report-dto';
import { BilledMonthDto } from '../models/BilledMonthDto';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  private dateFiltersSubject = new BehaviorSubject<{ dateFrom: any; dateTo: any }>({ dateFrom: null, dateTo: null });
  dateFilters$ = this.dateFiltersSubject.asObservable();

  setFilters(dateFrom: any, dateTo: any) {
    this.dateFiltersSubject.next({ dateFrom, dateTo });
  }
  obtenerMontoTotalPorCliente(dateFrom: string, dateTo: string): Observable<ClientReportDTO[]> {
    let formattedDateFrom = '';
    let formattedDateTo = '';
    if(dateFrom){
       formattedDateFrom = this.formatDate(dateFrom);
    }
    if(dateTo){
       formattedDateTo = this.formatDate(dateTo);
    }

    const url = `http://localhost:8081/ReportsByClients?dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}`;

    return this.http.get<ClientReportDTO[]>(url);
  }

  private formatDate(date: string): string {
    return date.split('-').reverse().join('%2F');
  }
  generateReportPdf(dateFrom: string, dateTo: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });
    let formattedDateFrom = '';
    let formattedDateTo = '';
    if(dateFrom){
       formattedDateFrom = this.formatDate(dateFrom);
    }
    if(dateTo){
       formattedDateTo = this.formatDate(dateTo);
    }
    return this.http.get(`http://localhost:8081/reportsByClients/pdf?dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}`, {
      responseType: 'blob',
      headers: headers
    });
  }

  getBilledByMonths(dateFrom: string, dateTo: string): Observable<BilledMonthDto[]> {
    let formattedDateFrom = '';
    let formattedDateTo = '';
    if(dateFrom){
       formattedDateFrom = this.formatDate(dateFrom);
    }
    if(dateTo){
       formattedDateTo = this.formatDate(dateTo);
    }
    const url = `http://localhost:8081/api/v1/invoice/billed-months?dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}`;

    return this.http.get<BilledMonthDto[]>(url);
  }
}
