import { Component, ElementRef } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { ReportesService } from '../../../services/reportes.service';
import { ReporteResponse } from '../../../models/ReporteResponse';

@Component({
  selector: 'fn-estado-ventas',
  templateUrl: './estado-ventas.component.html',
  styleUrls: ['./estado-ventas.component.css']
})
export class EstadoVentasComponent {
  chart: any;
  chartInstance!: Chart;

  constructor() {
    
  }
  getReportesAndGenerateCharts(reporteResponse: ReporteResponse | undefined) {
    if(reporteResponse){
      this.generarReporteEstadoVenta(reporteResponse);
    }
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  generarReporteEstadoVenta(reportes : any) {
    const chartData = {
      labels: ['Pendiente', 'Entregado'], 
      datasets: [
        {
          label: 'Estado de ventas',
          data: [reportes.pendiente, reportes.entregado], 
          backgroundColor: [ 'red', 'green' ] 
        }
      ]
    };
  
    const canvas = document.getElementById('estado-venta') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.chartInstance) {
        this.chartInstance.destroy(); 
      }
      
      this.chartInstance = new Chart(ctx, {
        type: 'pie' as ChartType,
        data: chartData,
        options: {}
      });
    } else {
      console.error('Error al generar los reportes de top productos vendidos.');  }
  }
}
