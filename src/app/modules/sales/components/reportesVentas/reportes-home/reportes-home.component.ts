import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportesService } from '../../../services/reportes.service';
import { TipoVentasComponent } from '../tipo-ventas/tipo-ventas.component';
import { ReportesPorMesesComponent } from '../reportes-por-meses/reportes-por-meses.component';
import { TopProductosComponent } from '../reportes-topProductos/top-productos/top-productos.component';
import { EstadoVentasComponent } from '../estado-ventas/estado-ventas.component';
import { empty } from 'rxjs';

@Component({
  selector: 'fn-reportes-home',
  templateUrl: './reportes-home.component.html',
  styleUrls: ['./reportes-home.component.css']
})
export class ReportesHomeComponent {

  @ViewChild(TipoVentasComponent) tipoVentasComponent!: TipoVentasComponent;
  @ViewChild(ReportesPorMesesComponent) reportesPorMesesComponent!: ReportesPorMesesComponent;
  @ViewChild(TopProductosComponent) TopProductosComponent!: TopProductosComponent;
  @ViewChild(EstadoVentasComponent) estadoVentasComponent!: EstadoVentasComponent;
  mes: number | undefined = undefined; 
  anio: number = 2023;
  tipo_venta: number | undefined =  undefined;

  mostrarGrafico :boolean = true;
  montoTotal: number = 0;

  formData = {
    mes: this.mes,
    anio: this.anio,
    tipo_venta: this.tipo_venta
  }

  constructor(private reportesService: ReportesService) {}
  
  getReportesAndGenerateCharts(formData: any) {
    this.formData = formData;
    this.reportesService.getReportes(this.formData.anio, this.formData.mes, this.formData.tipo_venta).subscribe(
      (reportes) => {
        this.montoTotal = reportes.monto;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    console.log(this.formData)
    if (!this.formData.anio) {
      console.error('El año es obligatorio para generar el gráfico.');
      return;
    }
    if(!this.formData)
    {
      return;
    }
    this.getReportesAndGenerateCharts(this.formData); 
    this.tipoVentasComponent.getReportesAndGenerateCharts(this.formData);
    this.reportesPorMesesComponent.getReportesAndGenerateCharts(this.formData);
    this.TopProductosComponent.getReportesAndGenerateCharts(this.formData);
    this.estadoVentasComponent.getReportesAndGenerateCharts(this.formData);
    this.mostrarGrafico=true;

  }
  
  

  limpiarCampos(formData: any) {
    this.formData.mes = undefined;
    this.formData.tipo_venta = undefined;
    this.mostrarGrafico = false;
  }

}
