import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportesService } from '../../../services/reportes.service';
import { TipoVentasComponent } from '../tipo-ventas/tipo-ventas.component';
import { ReportesPorMesesComponent } from '../reportes-por-meses/reportes-por-meses.component';
import { TopProductosComponent } from '../reportes-topProductos/top-productos/top-productos.component';
import { EstadoVentasComponent } from '../estado-ventas/estado-ventas.component';

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
  mes!: number;
  anio: number = 2023;
  tipo_venta!: number;

  mostrarGrafico :boolean = true;

  formData = {
    mes: this.mes,
    anio: this.anio,
    tipo_venta: this.tipo_venta
  }
  constructor(private reportesService: ReportesService) {
    
  }

  onSubmit() {
    if (!this.formData.anio) {
      console.error('El año es obligatorio para generar el gráfico.');
      return;
    }
    this.tipoVentasComponent.getReportesAndGenerateCharts(this.formData);
    this.reportesPorMesesComponent.getReportesAndGenerateCharts(this.formData);
    this.TopProductosComponent.getReportesAndGenerateCharts(this.formData);
    this.estadoVentasComponent.getReportesAndGenerateCharts(this.formData);

  }

  limpiarCampos(formData: any) {
    this.formData = formData;
    this.formData.mes = 0;
    this.formData.tipo_venta = 0;
    this.mostrarGrafico = false;
  }

}
