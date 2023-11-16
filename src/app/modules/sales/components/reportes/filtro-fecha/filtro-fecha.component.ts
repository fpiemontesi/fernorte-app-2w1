import { Component } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'fn-filtro-fecha',
  templateUrl: './filtro-fecha.component.html',
  styleUrls: ['./filtro-fecha.component.css']
})
export class FiltroFechaComponent {

  mes!: number;
  anio!: number;
  tipo_venta!: number;

  constructor(private reportesService: ReportesService) {}

  onSubmit() {
    this.mes = this.mes.valueOf();
    this.anio = this.anio.valueOf();
    this.tipo_venta = this.tipo_venta.valueOf();
    this.generarGraficos();
    }

    generarGraficos(){
      this.reportesService.getReportes(this.mes, this.anio, this.tipo_venta).subscribe(
        (reportes) => {
          this.crearGraficoVentas(reportes); 
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    crearGraficoVentas(reportes: any[]) {
      const ctx = document.getElementById('grafico-ventas') as HTMLCanvasElement;
    
      if (Array.isArray(reportes) && reportes.length > 0) {
        const labels = reportes.map(venta => `${venta.mes}-${venta.anio}`);
        const data = reportes.map(venta => ({
          mes: venta.mes,
          anio: venta.anio,
          total: venta.total_ventas 
        }));
    
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total Ventas',
              data: data.map(item => item.total),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Gráfico de Ventas'
              }
            }
          }
        });
      } else {
        console.error('Los datos de reportes no son válidos o están vacíos.');
      }
    }

   
    
}
