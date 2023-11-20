import { Component, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportesService } from 'src/app/modules/sales/services/reportes.service';
import {  ChartType } from 'chart.js';

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
  constructor(private reportesService: ReportesService, private elementRef: ElementRef) {
    
  }
  getReportesAndGenerateCharts(formData: any) {
    this.formData = formData;
    this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe(
      (reportes) => {
        this.generarReporteTipoVentas(reportes);
       this.montoTotal = reportes.monto;
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
  
  generarReporteTipoVentas(reportes : any) {
    const chartData = {
      labels: ['Venta Mayorista', 'Venta Minorista'], 
      datasets: [
        {
          label: 'Cantidad de ventas Minoristas y Mayoristas',
          data: [reportes.mayorista, reportes.minorista], 
          backgroundColor: this.generateRandomColor(2)
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
