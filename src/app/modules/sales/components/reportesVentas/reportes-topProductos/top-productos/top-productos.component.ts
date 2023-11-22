import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { ReporteResponse } from 'src/app/modules/sales/models/ReporteResponse';
import { ReportesService } from 'src/app/modules/sales/services/reportes.service';

@Component({
  selector: 'fn-top-productos',
  templateUrl: './top-productos.component.html',
  styleUrls: ['./top-productos.component.css']
})
export class TopProductosComponent implements OnDestroy,OnInit {
  chart: any;
  chartInstance!: Chart;
  constructor() { }
  ngOnInit(): void {}
  getReportesAndGenerateCharts(reporteResponse: ReporteResponse | undefined) {
    if(reporteResponse){
      this.generarReporteTopProductos(reporteResponse);
    }
  }

  ngOnDestroy() {
    // Destruir la instancia del gráfico al salir del componente
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
  generarReporteTopProductos(reportes : any) {
    const chartData: { labels: string[], datasets: any[] } = {
      labels: [],
      datasets: [
        {
          label: 'Productos más vendidos',
          data: [],
          backgroundColor: []
        }
      ]
    };
  
    reportes.productos.forEach((productos: any) => {
      chartData.labels.push(productos.descripcion);
      chartData.datasets[0].data.push(productos.cantidad);
      chartData.datasets[0].backgroundColor.push(this.generateRandomColor(5));
    });
  
    const canvas = document.getElementById('top-productos') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut' as ChartType,
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            
          }
        }
      });
    } else {
      console.error('Error al generar los reportes de estado de venta.');
    }
  }
     generateRandomColor(count: number): string[] {
      const colors: string[] = [];
  
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${count})`;
      colors.push(color);
  
      return colors;
    }
}
