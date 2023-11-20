import { Component, ElementRef } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'fn-estado-ventas',
  templateUrl: './estado-ventas.component.html',
  styleUrls: ['./estado-ventas.component.css']
})
export class EstadoVentasComponent {

  mes!: number;
  anio: number = 2023;
  tipo_venta!: number;

  chart: any;
  chartInstance!: Chart;
  montoTotal!:number;

  formData = {
    mes: this.mes,
    anio: this.anio,
    tipo_venta: this.tipo_venta
  }
  constructor(private reportesService: ReportesService, private elementRef: ElementRef) {
    
  }
  getReportesAndGenerateCharts(formData: any) {
    this.formData = formData;
    this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe(
      (reportes) => {
        this.generarReporteEstadoVenta(reportes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    // Destruir la instancia del gráfico al salir del componente
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
