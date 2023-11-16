import { Component, OnInit, OnDestroy } from '@angular/core';
import { BilledMonthDto } from '../../../models/BilledMonthDto';
import { ReportesService } from '../../../services/reportes.service';
import { ToastService } from '../../../services/toast.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-monthsBilledColsChart',
  templateUrl: './monthsBilledColsChart.component.html',
  styleUrls: ['./monthsBilledColsChart.component.css']
})
export class MonthsBilledColsChartComponent implements OnInit, OnDestroy {
  billedMonths: BilledMonthDto[] = [];
  chartInstance: any;
  dateFrom: any;
  dateTo: any;
  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  constructor(private reportService: ReportesService, private toastService: ToastService) { }

  ngOnInit() {
    this.reportService.dateFilters$.subscribe((filters) => {
      // Actualizar las fechas y realizar la búsqueda
      this.search(filters.dateFrom, filters.dateTo);
    });
  }

  ngOnDestroy() {
    // Destruir la instancia del gráfico al salir del componente
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }
  search(dateFrom: any, dateTo: any) {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    // Realizar la búsqueda utilizando las fechas proporcionadas
    this.reportService.getBilledByMonths(dateFrom, dateTo).subscribe((result) => {
      this.billedMonths = result;
      this.createChart();
    });
  }

  createChart() {
    const labels = this.billedMonths.map(month => this.getMonthName(Number(month.month)));
    const dataValues = this.billedMonths.map(month => month.totalAmount);

    const ctx = document.getElementById('MyBarChart') as HTMLCanvasElement;
    
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monto total facturado por mes',
          data: dataValues,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Monto total facturado por mes',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
}
