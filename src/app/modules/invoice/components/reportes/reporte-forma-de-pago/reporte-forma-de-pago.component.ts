import { Component } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { ToastService } from '../../../services/toast.service';
import Chart from 'chart.js/auto';
import { ReportPaymentMethodDTO } from '../../../models/report-payment-method-dto';

@Component({
  selector: 'fn-reporte-forma-de-pago',
  templateUrl: './reporte-forma-de-pago.component.html',
  styleUrls: ['./reporte-forma-de-pago.component.css']
})
export class ReporteFormaDePagoComponent {


  payments:ReportPaymentMethodDTO[] = [];
  chartInstance2: any;
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
    if(this.chartInstance2){
      this.chartInstance2.destroy();
    }
    // Realizar la búsqueda utilizando las fechas proporcionadas
    this.reportService.getAmountByPaymentsMethods(dateFrom, dateTo).subscribe((result) => {
      this.payments = result;
      console.log(this.payments)
      this.createChart();
    });
  }

  createChart() {
    const labels = this.payments.map(payments => payments.formapago);
    const dataValues = this.payments.map(payments => payments.monto);

    this.chartInstance2 = new Chart("chartForms", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Montos Totales Segun Forma de Pago',
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
            text: 'Ventas por Forma de Pago',
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


