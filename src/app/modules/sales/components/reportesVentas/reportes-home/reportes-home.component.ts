import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { TipoVentasComponent } from '../tipo-ventas/tipo-ventas.component';
import { ReportesPorMesesComponent } from '../reportes-por-meses/reportes-por-meses.component';
import { TopProductosComponent } from '../reportes-topProductos/top-productos/top-productos.component';
import { EstadoVentasComponent } from '../estado-ventas/estado-ventas.component';

import Swal from 'sweetalert2';
import { ReporteResponse } from '../../../models/ReporteResponse';

@Component({
  selector: 'fn-reportes-home',
  templateUrl: './reportes-home.component.html',
  styleUrls: ['./reportes-home.component.css']
})
export class ReportesHomeComponent implements OnInit {
  @ViewChild('reportes') reportesDOM: ElementRef | undefined;
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

  // Datos del reporte obtenido:
  reportesResponse:ReporteResponse | undefined;

  constructor(private reportesService: ReportesService,private window:Window) {}
  ngOnInit(): void {
    
  }
  obtenerNombreMes(mes: string) {
    this.mesNombre = mes;
  }
  getReportesAndGenerateCharts(formData: any) {
    console.log(formData.tipo_venta)
    this.reportesService.getReportes(formData.anio, formData.mes, formData.tipo_venta).subscribe({
      next: (reportes) => {
        this.reportesResponse = reportes;
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
        else{
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema al generar los reportes',
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
        this.tipoVentasComponent?.getReportesAndGenerateCharts(this.reportesResponse);
        this.reportesPorMesesComponent?.getReportesAndGenerateCharts(this.reportesResponse);
        this.TopProductosComponent?.getReportesAndGenerateCharts(this.reportesResponse);
        this.estadoVentasComponent?.getReportesAndGenerateCharts(this.reportesResponse);
    },100)
      
  
    this.mostrarGrafico = true;
    setTimeout(() => {
        if(this.reportesDOM)
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
  }
  
  imprimir() {
    this.window.print();
  }
  limpiarCampos() {
    this.mes = undefined;
    this.tipo_venta = undefined;
    this.anio = 2023;
    this.mostrarGrafico = false;
  }

}
