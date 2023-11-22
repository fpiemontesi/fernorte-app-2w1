import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { ConsultarPresupuestoComponent } from './components/consultar-presupuesto/consultar-presupuesto.component';
import { ConsultarVentaComponent } from './components/consultar-venta/consultar-venta.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaPresupuestoComponent } from './components/alta-presupuesto/alta-presupuesto.component';
import { RouterModule, Routes } from '@angular/router';
import { ModificarPresupuestoComponent } from './components/modificar-presupuesto/modificar-presupuesto.component';
import { ReportesHomeComponent } from './components/reportesVentas/reportes-home/reportes-home.component';
import { TipoVentasComponent } from './components/reportesVentas/tipo-ventas/tipo-ventas.component';
import { ReportesPorMesesComponent } from './components/reportesVentas/reportes-por-meses/reportes-por-meses.component';
import { TopProductosComponent } from './components/reportesVentas/reportes-topProductos/top-productos/top-productos.component';
import { EstadoVentasComponent } from './components/reportesVentas/estado-ventas/estado-ventas.component';
//import { ChartsModule } from 'ng2-charts';



const routes: Routes = [
  {
    path: 'sales',
    component: HomeComponent,
    children: [
      {
        path: 'consultar-venta',
        component: ConsultarVentaComponent
      },
      {
        path: 'consultar-presupuesto',
        component: ConsultarPresupuestoComponent
      },
      {
        path: 'alta-presupuesto',
        component: AltaPresupuestoComponent,
        children: [
          {
            path: '',
            component: AltaPresupuestoComponent
          },
          {
            path: ':venta_from_presupuesto',
            component: AltaPresupuestoComponent
          }
        ]
      },
      {
        path: 'modificar-presupuesto',
        component: ModificarPresupuestoComponent
      },
      {
        path: 'reportes-home',
        component: ReportesHomeComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    HomeComponent,
    ConsultarPresupuestoComponent,
    ConsultarVentaComponent,
    AltaPresupuestoComponent,
    ModificarPresupuestoComponent,
    ReportesHomeComponent,
    TipoVentasComponent,
    ReportesPorMesesComponent,
    TopProductosComponent,
    EstadoVentasComponent,
  ],
  providers: [{
    provide: Window,
    useValue: window
  }],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],
})
export class SalesModule {}
