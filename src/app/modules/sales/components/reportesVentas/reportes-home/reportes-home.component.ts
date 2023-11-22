import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { TipoVentasComponent } from '../tipo-ventas/tipo-ventas.component';
import { ReportesPorMesesComponent } from '../reportes-por-meses/reportes-por-meses.component';
import { TopProductosComponent } from '../reportes-topProductos/top-productos/top-productos.component';
import { EstadoVentasComponent } from '../estado-ventas/estado-ventas.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'fn-reportes-home',
  templateUrl: './reportes-home.component.html',
  styleUrls: ['./reportes-home.component.css']
})
export class ReportesHomeComponent {
  @ViewChild('reportes') reportesDOM!: ElementRef;
  @ViewChild(TipoVentasComponent) tipoVentasComponent: TipoVentasComponent | undefined
  @ViewChild(ReportesPorMesesComponent) reportesPorMesesComponent: ReportesPorMesesComponent | undefined
  @ViewChild(TopProductosComponent) TopProductosComponent: TopProductosComponent | undefined
  @ViewChild(EstadoVentasComponent) estadoVentasComponent: EstadoVentasComponent | undefined
  mes: number | undefined = undefined; 
  anio: number = 2023;
  tipo_venta: number | undefined =  undefined;
  mesNombre:string | undefined = undefined;
  mostrarGrafico :boolean = false;
  montoTotal: number = 0;

  montoMesAnterior: number = 0;

  

  constructor(private reportesService: ReportesService) {}
  obtenerNombreMes(mes: string) {
    this.mesNombre = mes;
  }
  getReportesAndGenerateCharts(formData: any) {
    this.reportesService.getReportes(formData.anio, formData.mes, formData.tipo_venta).subscribe({
      next: (reportes) => {
        this.montoTotal = reportes.monto;
        this.montoMesAnterior = reportes.monto_mes_anterior;
      },
      error: (error) => {
        if(error.status == 404)
        {
          Swal.fire({
            icon: 'error',
            title: 'No se han encontraron resultados para los filtros especificados',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          })
        }
        console.error(error);
        this.montoTotal = 0;
      }
    });
  }

  onSubmit() {
    
    if (!this.anio) {
      console.error('El año es obligatorio para generar el gráfico.');
      return;
    }
    var formData = {
      mes: this.mes,
      anio: this.anio,
      tipo_venta: this.tipo_venta
    }
    this.getReportesAndGenerateCharts(formData); 
    setTimeout(() => {
      this.tipoVentasComponent?.getReportesAndGenerateCharts(formData);
      this.reportesPorMesesComponent?.getReportesAndGenerateCharts(formData);
      this.TopProductosComponent?.getReportesAndGenerateCharts(formData);
      this.estadoVentasComponent?.getReportesAndGenerateCharts(formData);
    },100)
    

    this.mostrarGrafico = true;
    setTimeout(() => {
      this.moverPantalla(this.reportesDOM.nativeElement);
    },150)
    
  }
  
  moverPantalla(elemento: HTMLElement){
    if(elemento){
      setTimeout(() => {
        elemento.scrollIntoView({
          behavior: 'smooth',
        });
      },100)}
      window.print();
  }
  

  limpiarCampos() {
    this.mes = undefined;
    this.tipo_venta = undefined;
    this.anio = 2023;
    this.mostrarGrafico = false;
    
  }

}
