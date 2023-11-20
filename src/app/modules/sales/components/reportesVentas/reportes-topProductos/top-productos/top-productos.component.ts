import { Component, ElementRef } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { ReportesService } from 'src/app/modules/sales/services/reportes.service';

@Component({
  selector: 'fn-top-productos',
  templateUrl: './top-productos.component.html',
  styleUrls: ['./top-productos.component.css']
})
export class TopProductosComponent {

  mes!: number;
  anio: number = 2023;
  tipo_venta!: number;

  chart: any;
  chartInstance!: Chart;

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
        this.generarReporteTopProductos(reportes);
       
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
        type: 'pie' as ChartType,
        data: chartData,
        options: {}
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
