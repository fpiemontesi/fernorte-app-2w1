import { Component, OnInit } from '@angular/core';
import { ClientReportDTO } from '../../../models/client-report-dto';
import Chart from 'chart.js/auto';
import { ReportesService } from '../../../services/reportes.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-ClientsConsumePieChart',
  templateUrl: './ClientsConsumePieChart.component.html',
  styleUrls: ['./ClientsConsumePieChart.component.css']
})
export class ClientsConsumePieChartComponent implements OnInit {
  clients:ClientReportDTO[] = [];
  chartInstance: any;
  dateFrom:any;
  dateTo:any;
  constructor(private reportService:ReportesService, private toastService: ToastService) { }

  ngOnInit() {
    this.reportService.dateFilters$.subscribe((filters) => {
      // Actualizar las fechas y realizar la búsqueda
      this.search(filters.dateFrom, filters.dateTo);
    });
  }

  search(dateFrom: any, dateTo: any) {
    if(this.chartInstance){
      this.chartInstance.destroy();
    }
    // Realizar la búsqueda utilizando las fechas proporcionadas
    this.reportService.obtenerMontoTotalPorCliente(dateFrom, dateTo).subscribe((result) => {
      this.clients = result;
      this.createChart();
    });
  }

  createChart() {
    const labels = this.clients.map(client => client.name + ' ' + client.lastName);
    const dataValues = this.clients.map(client => client.totalAmount);

    this.chartInstance = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas por cliente',
          data: dataValues,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: 'Ventas por Cliente',
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
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }
}
