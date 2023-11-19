import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { AltaVentaComponent } from './components/alta-venta/alta-venta.component';
import { ConsultarPresupuestoComponent } from './components/consultar-presupuesto/consultar-presupuesto.component';
import { ConsultarVentaComponent } from './components/consultar-venta/consultar-venta.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaPresupuestoComponent } from './components/alta-presupuesto/alta-presupuesto.component';
import { ModificarVentaComponent } from './components/modificar-venta/modificar-venta.component';
import { RouterModule, Routes } from '@angular/router';
import { ModificarPresupuestoComponent } from './components/modificar-presupuesto/modificar-presupuesto.component';
import { FiltroFechaComponent } from './components/reportes/filtro-fecha/filtro-fecha.component';
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
        path: 'reporte-filtro',
        component: FiltroFechaComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    HomeComponent,
    AltaVentaComponent,
    ConsultarPresupuestoComponent,
    ConsultarVentaComponent,
    AltaPresupuestoComponent,
    ModificarVentaComponent,
    ModificarPresupuestoComponent,
    FiltroFechaComponent,
  ],
  providers: [],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule,RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],
})
export class SalesModule {}
