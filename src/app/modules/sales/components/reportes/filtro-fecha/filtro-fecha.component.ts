import { Component } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import {  ChartType } from 'chart.js';
import  {Chart } from 'chart.js/auto';
import { Detalle } from '../../../models/Detalles';

@Component({
  selector: 'fn-filtro-fecha',
  templateUrl: './filtro-fecha.component.html',
  styleUrls: ['./filtro-fecha.component.css']
})
export class FiltroFechaComponent {
  mes!: number;
  anio: number = 2023;
  tipo_venta!: number;

  formData = {
    mes: this.mes,
    anio: this.anio,
    tipo_venta: this.tipo_venta
  }

  chart: any;
  chartInstance!: Chart;

  constructor(private reportesService: ReportesService) {
    
  }

  
  onSubmit() {
    if (!this.formData.anio) {
      console.error('El año es obligatorio para generar el gráfico.');
      return;
    }

  //////  const acceso= this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe();
    this.reporteEstadoVenta();
  //  this.reporteTopProductos();

  }   
    
    reporteTopProductos(){
      this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe(
        (reportes) => {
          const chartData = {
            labels: [],
            datasets: [
              {
                label: 'Estado de ventas',
                data: [],
                backgroundColor: this.generateRandomColor(2)
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
              type: 'bar',
              data: chartData,
              options: {
              }
            });
          } else {
            console.error('Failed to get the 2D rendering context for the canvas');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
    reporteEstadoVenta(){
      this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe(
        (reportes) => {
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
              options: {
              }
            });
          } else {
            console.error('Failed to get the 2D rendering context for the canvas');
          }
        },
        (error) => {
          console.error(error);
        }
      );
      
    }
    

   generateRandomColor(count: number): string[] {
    const colors: string[] = [];

    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${count})`;
    colors.push(color);

    return colors;
  }


}