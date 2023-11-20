import { Component, ElementRef } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'fn-reportes-por-meses',
  templateUrl: './reportes-por-meses.component.html',
  styleUrls: ['./reportes-por-meses.component.css']
})
export class ReportesPorMesesComponent {

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
        this.generarReporteVentasPorMeses(reportes);
       
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
  generarReporteVentasPorMeses(reportes: any) {
    const chartData = {
      labels: ['Mes Anterior', 'Mes Actual'],
      datasets: [
        {
          label: 'Mes Anterior (Monto)',
          data: [reportes.monto_mes_anterior],
          backgroundColor: this.generateRandomColor(1)
        },
        {
          label: 'Mes Anterior (Cant Ventas)',
          data: [reportes.total_mes_anterior],
          backgroundColor: this.generateRandomColor(1)
        }, 
        {
          label: 'Mes Actual (Cant Ventas)',
          data: [reportes.total_ventas],
          backgroundColor: this.generateRandomColor(1)
        },
        {
          label: 'Mes Actual (Monto)',
          data: [reportes.monto],
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
  
  generateRandomColor(count: number): string[] {
    const colors: string[] = [];

    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${count})`;
    colors.push(color);

    return colors;
  }
}
