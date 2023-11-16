import { Component } from '@angular/core';
import { ClientReportDTO } from '../../../models/client-report-dto';
import { ReportesService } from '../../../services/reportes.service';
import Chart from 'chart.js/auto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'fn-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.css']
})
export class ReporteClientesComponent {
  clients : ClientReportDTO[] = [];
  dateFrom: string ='';
  dateTo : string ='';
  constructor(private reportService:ReportesService,  private toastService: ToastService) {
  }
  ngOnInit() {
    this.reportService.dateFilters$.subscribe((filters) => {
      this.dateFrom = filters.dateFrom;
      this.dateTo = filters.dateTo;
      this.search(filters.dateFrom, filters.dateTo);
    });
  }

  search(dateFrom: any, dateTo: any) {
    // Realizar la búsqueda utilizando las fechas proporcionadas
    this.reportService.obtenerMontoTotalPorCliente(dateFrom, dateTo).subscribe((result) => {
      this.clients = result;
    });
  }
  generatePdf(){
    try {
      this.reportService.generateReportPdf(this.dateFrom,this.dateTo).subscribe(
        (blob: Blob) => {
          this.toastService.show('Pdf de reporte generato', {
            classname: 'bg-success text-light centered-toast',
            delay: 3000,
          })
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        (error) => {
          this.toastService.show('Error al generar el pdf', {
            classname: 'bg-danger text-light centered-toast',
            delay: 3000,
          });
        }
      );
    } catch (error) {
      this.toastService.show('Error al generar el pdf', {
        classname: 'bg-danger text-light',
        delay: 15000,
      });
  }
  }

  
}
