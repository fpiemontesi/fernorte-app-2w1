import { Component, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportesService } from 'src/app/modules/sales/services/reportes.service';
import {  ChartType, Colors } from 'chart.js';

@Component({
  selector: 'fn-tipo-ventas',
  templateUrl: './tipo-ventas.component.html',
  styleUrls: ['./tipo-ventas.component.css']
})
export class TipoVentasComponent {
  mes!: number;
  anio: number = 2023;
  tipo_venta!: number;

  chart: any;
  chartInstance!: Chart;

  montoTotal: number = 0;
  formData = {
    mes: this.mes,
    anio: this.anio,
    tipo_venta: this.tipo_venta
  }
  constructor(private reportesService: ReportesService) {
    
  }
  getReportesAndGenerateCharts(formData: any) {

    this.reportesService.getReportes(formData.anio, formData.mes, formData.tipo_venta).subscribe({
      next: (reportes) => {
        this.generarReporteTipoVentas(reportes);
        this.montoTotal = reportes.monto;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  ngOnDestroy() {
    // Destruir la instancia del gráfico al salir del componente
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
  
  generarReporteTipoVentas(reportes : any) {
    const chartData = {
      labels: ['Ventas Mayoristas y Minoristas'], 
      datasets: [
        {
          label: 'Ventas Mayoristas',
          data: [reportes.mayorista], 
          backgroundColor: ['violet']
        },
        {
          label: 'Ventas Minoristas',
          data: [reportes.minorista], 
          backgroundColor: ['orange']
        }
      ]
    };
  
    const canvas = document.getElementById('may-min') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.chartInstance) {
        this.chartInstance.destroy(); 
      }
      
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
            data: chartData,
            options: {
              scales: {
                y: {
                  beginAtZero: true 
                }
              }
            }
      });
    } else {
      console.error('Error al generar los reportes de ventas del mes anterior y del mes actual.');  }
  }

  generateRandomColor(count: number): string[] {
    const colors: string[] = [];

    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${count})`;
    colors.push(color);

    return colors;
  }

}
