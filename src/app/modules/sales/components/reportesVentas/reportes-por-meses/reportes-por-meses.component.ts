import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { ReporteResponse } from '../../../models/ReporteResponse';

@Component({
  selector: 'fn-reportes-por-meses',
  templateUrl: './reportes-por-meses.component.html',
  styleUrls: ['./reportes-por-meses.component.css']
})
export class ReportesPorMesesComponent implements OnDestroy,OnInit {
  chart: any;
  chart2: any;
  chartInstance!: Chart;
  chartInstance2!: Chart;

  constructor() {}
  ngOnInit(): void {}
  getReportesAndGenerateCharts(reporteResponse: ReporteResponse | undefined) {
    if(reporteResponse){
      this.generarReporteCantidades(reporteResponse);
      this.generarReporteVentasPorMeses(reporteResponse);
    }
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
  generarReporteVentasPorMeses(reportes: any) {
    const chartData = {
      labels: ['Comparacion cantidad de ventas realizadas'],
      datasets: [
        {
          label: 'Anterior',
          data: [ reportes.total_mes_anterior],
          backgroundColor: this.generateRandomColor(1)
        },
        {
          label: 'Actual',
          data: [reportes.total_ventas],
          backgroundColor: this.generateRandomColor(1)
        }
      ]
    };
  
    const canvas = document.getElementById('ant-actual') as HTMLCanvasElement;
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
      console.error('Error al generar los reportes de ventas del mes anterior y del mes actual.');
    }
  } 

  generarReporteCantidades(reportes: any) {
    console.log(reportes);
    const chartData = {
      labels: ['Comparacion monto facturado'],
      datasets: [
        {
          label: 'Anterior',
          data: [ reportes.monto_mes_anterior],
          backgroundColor: this.generateRandomColor(1)
        },
        {
          label: 'Actual',
          data: [reportes.monto],
          backgroundColor: this.generateRandomColor(1)
        }
      ]
    };
  
    const canvas = document.getElementById('monto') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.chartInstance2) {
        this.chartInstance2.destroy();
      }
  
      this.chartInstance2 = new Chart(ctx, {
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
      console.error('Error al generar los reportes de ventas del mes anterior y del mes actual.');
    }
  } 
  
  generateRandomColor(count: number): string[] {
    const colors: string[] = [];

    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${count})`;
    colors.push(color);

    return colors;
  }
}
